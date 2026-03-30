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
  replaceTokensInObject,
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
    if (!layoutData.sitecore?.route) {
      debug.personalize('skipped (layout is empty)');
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

    const result = await this.getVariantIds(req, language, pathname);
    if (result.variantIds.length === 0) {
      return layoutData;
    }
    const personalizeData = getGroomedVariantIds(result.variantIds);
    // layout will be personalized here
    personalizeLayout(layoutData, personalizeData.variantId, personalizeData.componentVariantIds);
    if (Object.keys(result.tokens).length > 0) {
      const replaced = replaceTokensInObject(layoutData, result.tokens, {
        removeUnmatched: true,
        onUnmatched: (key) => debug.personalize('unmatched personalize token: %s', key),
      });
      // Direct property assignment rather than Object.assign to make clear that
      // layoutData.sitecore is the only subtree that contains token placeholders.
      layoutData.sitecore = replaced.sitecore;
    }
    debug.personalize('personalize layout end in %dms: %o', Date.now() - startTimestamp, {
      headers: this.extractDebugHeaders(req.headers),
      variantIds: result.variantIds,
    });
    return layoutData;
  };

  /**
   * Init CloudSDK personalization on server side
   * @param {IncomingMessage} request incoming nodejs request object
   * @param {OutgoingMessage} response outgoing nodejs response object
   * @param {string} hostname host for cookies. Usually a host header, or a fallback config
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
  ): Promise<{ variantIds: string[]; tokens: Record<string, string> }> => {
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
      return { variantIds: [], tokens: {} };
    }

    if (personalizeInfo.variantIds.length === 0) {
      debug.personalize('skipped (no personalization configured)');
      return { variantIds: [], tokens: {} };
    }

    const params = this.getExperienceParams(req);
    const executions = this.getPersonalizeExecutions(personalizeInfo, language);
    const identifiedVariantIds: string[] = [];
    const mergedTokens: Record<string, string> = {};
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
                if (personalization.tokens) {
                  for (const [k, v] of Object.entries(personalization.tokens)) {
                    if (
                      k !== '__proto__' &&
                      k !== 'constructor' &&
                      k !== 'prototype' &&
                      typeof v === 'string'
                    ) {
                      if (mergedTokens[k] !== undefined) {
                        debug.personalize(
                          'token key collision: "%s" overwritten by value from another decision table',
                          k
                        );
                      }
                      mergedTokens[k] = v;
                    }
                  }
                }
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
      return { variantIds: [], tokens: {} };
    }
    return { variantIds: identifiedVariantIds, tokens: mergedTokens };
  };

  protected getLanguage(layoutData: LayoutServiceData): string {
    return layoutData.sitecore?.context?.language || this.config.defaultLanguage || 'en';
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
      tokens?: Record<string, string>;
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
