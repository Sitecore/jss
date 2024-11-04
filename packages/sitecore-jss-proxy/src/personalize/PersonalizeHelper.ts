import { CloudSDK } from '@sitecore-cloudsdk/core/server';
import { personalize } from '@sitecore-cloudsdk/personalize/server';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';
import { debug } from '@sitecore-jss/sitecore-jss';
import {
  CdpHelper,
  DEFAULT_VARIANT,
  GraphQLPersonalizeService,
  PersonalizeInfo,
  getGroomedVariantIds,
  personalizeLayout,
} from '@sitecore-jss/sitecore-jss/personalize';
import { IncomingHttpHeaders, IncomingMessage, OutgoingMessage } from 'http';
import {
  ExperienceParams,
  IncomingMessageWithBody,
  PersonalizeConfig,
  PersonalizeExecution,
} from '../types/personalize';
import querystring from 'querystring';

// TODO: return defaults to 400

export class PersonalizeHelper {
  private personalizeService: GraphQLPersonalizeService;
  private defaultHostname: string;

  constructor(protected config: PersonalizeConfig) {
    this.personalizeService = new GraphQLPersonalizeService({
      ...config.edgeConfig,
    });
    this.defaultHostname = config.defaultHostname || 'localhost';
  }

  /**
   * Personalizes formatted layout data on page request
   * @param {IncomingMessage} req Incoming page request
   * @param {OutgoingMessage} res HTML page response
   * @param {LayoutServiceData} layoutData layoutData for the page
   * @returns layout data with personalization applied
   */
  personalizePageLoad = async (
    req: IncomingMessage,
    res: OutgoingMessage,
    layoutData: LayoutServiceData
  ) => {
    const variantIds = await this.getVariantIds(req, res);
    return this.personalizeLayout(layoutData, variantIds);
  };

  /**
   * Personalzies the data from raw layout service request
   * @param {IncomingMessage} req request to layout service endpoint
   * @param {OutgoingMessage} res layout service response
   * @param {string} rawResponse raw layout service response payload
   * @returns {string} stringified layout data response with personalization
   */
  personalizeLayoutServiceResponse = async (
    req: IncomingMessageWithBody,
    res: OutgoingMessage,
    rawResponse: string
  ): Promise<string> => {
    if (!req.body) {
      debug.personalize('skipped (layout serive request body is empty)');
      return rawResponse;
    }
    const payload = JSON.stringify(req.body);
    const match = Array.from(payload.matchAll(/routePath:\\"(.*?)\\"/g));
    // path will be in first catch group
    const path = match && match[0][1] ? match[0][1] : undefined;
    const layoutDataRaw = JSON.parse(rawResponse);
    if (!layoutDataRaw?.data?.layout?.item?.rendered?.sitecore) {
      debug.personalize('skipped (layout response has no route data)');
      return rawResponse;
    }

    const variantIds = await this.getVariantIds(req, res, path);
    const layoutData = {
      sitecore: {
        ...layoutDataRaw?.data?.layout?.item?.rendered?.sitecore,
      },
    };
    const personalizedLayoutData = {
      ...layoutData,
      ...this.personalizeLayout(layoutData, variantIds),
    };
    layoutDataRaw.data.layout.item.rendered = personalizedLayoutData;
    return JSON.stringify(layoutDataRaw);
  };

  protected getVariantIds = async (
    req: IncomingMessage,
    res: OutgoingMessage,
    path?: string
  ): Promise<string[]> => {
    const pathname = path || req.url;
    // adapt to weird node typings, this case shouldn't happen ever
    if (!pathname) {
      return [];
    }
    const language = this.getLanguage();
    const hostname = this.getHostHeader(req) || this.defaultHostname;
    // const startTimestamp = Date.now();
    const timeout = this.config.cdpConfig.timeout;

    const response = res;

    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
      hostname,
      headers: this.extractDebugHeaders(req.headers),
    });

    if (this.config.disabled && this.config.disabled(req, response)) {
      debug.personalize('skipped (personalize is disabled)');
      return [];
    }

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(
      pathname,
      language,
      this.config.sitecoreSiteName
    );
    if (!personalizeInfo) {
      // Likely an invalid route / language
      debug.personalize('skipped (personalize info not found)');
      return [];
    }

    if (personalizeInfo.variantIds.length === 0) {
      debug.personalize('skipped (no personalization configured)');
      return [];
    }

    await this.initPersonalizeServer({
      hostname,
      siteName: this.config.sitecoreSiteName,
      request: req,
      response,
    });

    const params = this.getExperienceParams(req);
    const executions = this.getPersonalizeExecutions(personalizeInfo, language);
    const identifiedVariantIds: string[] = [];
    debug.personalize(`CDP timeout is ${timeout}`);
    try {
      await Promise.all(
        executions.map((execution) =>
          this.personalize(
            {
              friendlyId: execution.friendlyId,
              variantIds: execution.variantIds,
              params,
              language,
              timeout,
            },
            req
          ).then((personalization) => {
            const variantId = personalization.variantId;
            if (variantId) {
              if (!execution.variantIds.includes(variantId)) {
                debug.personalize('invalid variant %s', variantId);
              } else {
                identifiedVariantIds.push(variantId);
              }
            }
          })
        )
      );
    } catch (e) {
      debug.personalize('personalization skipped, error %o', e);
    }

    if (identifiedVariantIds.length === 0) {
      debug.personalize('skipped (no variant(s) identified)');
      return [];
    }
    return identifiedVariantIds;
  };

  protected personalizeLayout(layoutData: LayoutServiceData, variantIds: string[]) {
    const personalizedLayout = { ...layoutData };
    if (!personalizedLayout.sitecore?.route) {
      debug.personalize('skipped (layout is empty)');
      return personalizedLayout;
    }
    const personalizeData = getGroomedVariantIds(variantIds);
    const personalizedPlaceholders = personalizeLayout(
      layoutData,
      personalizeData.variantId,
      personalizeData.componentVariantIds
    );
    if (!personalizedPlaceholders) {
      debug.personalize('skipped ()');
      return;
    }
    personalizedLayout.sitecore.route.placeholders = personalizedPlaceholders;
    return personalizedLayout;
  }

  protected getLanguage(): string {
    return 'en';
  }

  protected getHostHeader(req: IncomingMessage): string {
    return req.headers.host?.split(':')[0] || '';
  }

  protected extractDebugHeaders(incomingHeaders: IncomingHttpHeaders) {
    const headers = {} as { [key: string]: string | string[] | undefined };
    Object.keys(incomingHeaders).forEach(
      (key) => incomingHeaders[key] && (headers[key] = incomingHeaders[key])
    );
    return headers;
  }

  protected async initPersonalizeServer({
    hostname,
    siteName,
    request,
    response,
  }: {
    hostname: string;
    siteName: string;
    request: IncomingMessage;
    response: OutgoingMessage;
  }): Promise<void> {
    await CloudSDK(request, response, {
      sitecoreEdgeUrl: this.config.cdpConfig.sitecoreEdgeUrl,
      sitecoreEdgeContextId: this.config.cdpConfig.sitecoreEdgeContextId,
      siteName,
      cookieDomain: hostname,
      enableServerCookie: true,
    })
      .addPersonalize()
      .initialize();
  }

  protected async personalize(
    {
      params,
      friendlyId,
      language,
      timeout,
      variantIds,
    }: {
      params: ExperienceParams;
      friendlyId: string;
      language: string;
      timeout?: number;
      variantIds?: string[];
    },
    request: IncomingMessage
  ) {
    debug.personalize('executing experience for %s %o', friendlyId, params);

    return (await personalize(
      request,
      {
        channel: this.config.cdpConfig.channel || 'WEB',
        currency: this.config.cdpConfig.currency ?? 'USD',
        friendlyId,
        params,
        language,
        pageVariantIds: variantIds,
      },
      { timeout }
    )) as {
      variantId: string;
    };
  }

  protected getExperienceParams(req: IncomingMessage): ExperienceParams {
    // nodejs req.url does not have a hostname, we parse query string the old fashioned way
    const rawQs = req.url?.split('?')[1] || '';
    const queryString = querystring.parse(rawQs);
    // also need to account for types (string | string[]) returned by parse()
    const utm = {
      campaign: [queryString.utm_campaign].join() || undefined,
      content: [queryString.utm_content].join() || undefined,
      medium: [queryString.utm_medium].join() || undefined,
      source: [queryString.utm_source].join() || undefined,
    };

    return {
      // It's expected that the header name "referer" is actually a misspelling of the word "referrer"
      // req.referrer is used during fetching to determine the value of the Referer header of the request being made,
      // used as a fallback
      referrer: req.headers.referer || [req.headers.referrer].join(),
      utm: utm,
    };
  }

  protected getPersonalizeExecutions(
    personalizeInfo: PersonalizeInfo,
    language: string
  ): PersonalizeExecution[] {
    if (personalizeInfo.variantIds.length === 0) {
      return [];
    }
    const results: PersonalizeExecution[] = [];
    return personalizeInfo.variantIds.reduce((results, variantId) => {
      if (variantId.includes('_')) {
        // Component-level personalization in format "<ComponentID>_<VariantID>"
        const componentId = variantId.split('_')[0];
        const friendlyId = CdpHelper.getComponentFriendlyId(
          personalizeInfo.pageId,
          componentId,
          language,
          this.config.scope || this.config.edgeConfig.scope
        );
        const execution = results.find((x) => x.friendlyId === friendlyId);
        if (execution) {
          execution.variantIds.push(variantId);
        } else {
          // The default/control variant (format "<ComponentID>_default") is also a valid value returned by the execution
          const defaultVariant = `${componentId}${DEFAULT_VARIANT}`;
          results.push({
            friendlyId,
            variantIds: [defaultVariant, variantId],
          });
        }
      } else {
        // Embedded (page-level) personalization in format "<VariantID>"
        const friendlyId = CdpHelper.getPageFriendlyId(
          personalizeInfo.pageId,
          language,
          this.config.scope || this.config.edgeConfig.scope
        );
        const execution = results.find((x) => x.friendlyId === friendlyId);
        if (execution) {
          execution.variantIds.push(variantId);
        } else {
          results.push({
            friendlyId,
            variantIds: [variantId],
          });
        }
      }
      return results;
    }, results);
  }
}
