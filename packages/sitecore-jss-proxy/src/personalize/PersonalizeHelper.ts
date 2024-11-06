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
import { ExperienceParams, PersonalizeConfig, PersonalizeExecution } from '../types/personalize';
import querystring from 'querystring';

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
   * Performs personalize on layout data before a page is rendered
   * @param {IncomingMessage} req Incoming request nodejs object
   * @param {OutgoingMessage} res Outgoing response nodejs object
   * @param {LayoutServiceData} layoutData layoutData for the page
   * @returns layout data with personalization applied
   */
  personalizeLayoutData = async (
    req: IncomingMessage,
    res: OutgoingMessage,
    layoutData: LayoutServiceData
  ) => {
    if (!layoutData.sitecore?.context) {
      debug.personalize('skipped (sitecore context is empty)');
      return layoutData;
    }
    // current method can run for page requests and for layout service requests.
    // the latter will not have the correct path - so we use path from layoutData instead
    const pathname = layoutData.sitecore.context.itemPath;
    const language = this.getLanguage(layoutData);
    const hostname = this.getHostHeader(req) || this.defaultHostname;
    const startTimestamp = Date.now();
    if (!pathname) {
      debug.personalize('skipped (pathname missing from layoutData)');
      return layoutData;
    }

    debug.personalize('personalize layout start: %o', {
      pathname,
      language,
      hostname,
      headers: this.extractDebugHeaders(req.headers),
    });

    if (this.excludeRoute(pathname)) {
      debug.personalize('skipped (route excluded)');
      return layoutData;
    }
    if (this.config.disabled && this.config.disabled(req, res)) {
      debug.personalize('skipped (personalize is disabled)');
      return layoutData;
    }
    try {
      await this.initPersonalizeServer(req, res, hostname);
    } catch (e) {
      debug.personalize('skipped (CloudSDK initialization failed), error %o', e);
      return layoutData;
    }

    const variantIds = await this.getVariantIds(req, language, pathname);

    const result = variantIds ? this.personalizeLayout(layoutData, variantIds) : layoutData;
    debug.personalize('personalize layout end in %dms: %o', Date.now() - startTimestamp, {
      headers: this.extractDebugHeaders(req.headers),
    });
    return result;
  };

  /**
   * Init CloudSDK personalization on server side
   * @param {IncomingMessage} request incoming nodejs request object
   * @param {OutgoingMessage} response outgoing nodejs response object
   * @param {string} [hostname] host for cookies. When not provided, host will be read from host header, and fallback to 'localhost' if that fails
   */
  protected async initPersonalizeServer(
    request: IncomingMessage,
    response: OutgoingMessage,
    hostname: string
  ): Promise<void> {
    await CloudSDK(request, response, {
      sitecoreEdgeUrl: this.config.cdpConfig.sitecoreEdgeUrl,
      sitecoreEdgeContextId: this.config.cdpConfig.sitecoreEdgeContextId,
      siteName: this.config.sitecoreSiteName,
      cookieDomain: hostname,
      enableServerCookie: true,
    })
      .addPersonalize({ enablePersonalizeCookie: true })
      .initialize();
  }

  protected getVariantIds = async (
    req: IncomingMessage,
    language: string,
    pathname: string
  ): Promise<string[]> => {
    // const startTimestamp = Date.now();
    const timeout = this.config.cdpConfig.timeout;

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

    const params = this.getExperienceParams(req);
    const executions = this.getPersonalizeExecutions(personalizeInfo, language);
    const identifiedVariantIds: string[] = [];
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
      debug.personalize('skipped, error %o', e);
    }

    if (identifiedVariantIds.length === 0) {
      debug.personalize('skipped (no variant(s) identified)');
      return [];
    }
    return identifiedVariantIds;
  };

  protected personalizeLayout(layoutData: LayoutServiceData, variantIds: string[]) {
    if (!layoutData.sitecore?.route) {
      debug.personalize('skipped (layout is empty)');
      return layoutData;
    }
    const personalizeData = getGroomedVariantIds(variantIds);
    const personalizedPlaceholders = personalizeLayout(
      layoutData,
      personalizeData.variantId,
      personalizeData.componentVariantIds
    );
    layoutData.sitecore.route.placeholders = personalizedPlaceholders;
    return layoutData;
  }

  protected getLanguage(layoutData: LayoutServiceData): string {
    return layoutData.sitecore?.context?.language || 'en';
  }

  protected getHostHeader(req: IncomingMessage): string {
    return req.headers.host?.split(':')[0] || '';
  }

  protected excludeRoute(pathname: string) {
    return this.config?.excludeRoute && this.config?.excludeRoute(pathname);
  }

  protected extractDebugHeaders(incomingHeaders: IncomingHttpHeaders) {
    const headers = {} as { [key: string]: string | string[] | undefined };
    Object.keys(incomingHeaders).forEach(
      (key) => incomingHeaders[key] && (headers[key] = incomingHeaders[key])
    );
    return headers;
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
      campaign: [queryString.utm_campaign].join('') || undefined,
      content: [queryString.utm_content].join('') || undefined,
      medium: [queryString.utm_medium].join('') || undefined,
      source: [queryString.utm_source].join('') || undefined,
    };

    return {
      // It's expected that the header name "referer" is actually a misspelling of the word "referrer"
      // req.referrer is used during fetching to determine the value of the Referer header of the request being made,
      // used as a fallback
      referrer: req.headers.referer || [''].concat(req.headers.referrer || '').join(''),
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
          this.config.scope
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
          this.config.scope
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
