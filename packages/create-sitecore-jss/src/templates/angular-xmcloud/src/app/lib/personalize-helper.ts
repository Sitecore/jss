import { CloudSDK } from '@sitecore-cloudsdk/core/server';
import { personalize } from '@sitecore-cloudsdk/personalize/server';
import {
  CdpHelper,
  DEFAULT_VARIANT,
  GraphQLPersonalizeService,
  GraphQLPersonalizeServiceConfig,
  PersonalizeInfo,
  getGroomedVariantIds,
  personalizeLayout,
  LayoutServiceData,
  debug,
} from '@sitecore-jss/sitecore-jss-angular';
import { IncomingHttpHeaders, IncomingMessage, OutgoingMessage } from 'http';
import { environment as env } from '../../environments/environment';
import clientFactory from './graphql-client-factory';

// TODO: return defaults to 400
const defaultPersonalizeConfig: PersonalizeConfig ={
    // Configuration for your Sitecore Experience Edge endpoint
    edgeConfig: {
        clientFactory,
        timeout: (process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT &&
            parseInt(process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT)) ||
            600,
    },
    // Configuration for your Sitecore CDP endpoint
    cdpConfig: {
        sitecoreEdgeUrl: env.sitecoreEdgeUrl,
        sitecoreEdgeContextId: env.sitecoreEdgeContextId,
        timeout: (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
            parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
            1200,
    },
    // Optional Sitecore Personalize scope identifier.
    scope: process.env.NEXT_PUBLIC_PERSONALIZE_SCOPE,
    // This function determines if the middleware should be turned off.
    // IMPORTANT: You should implement based on your cookie consent management solution of choice.
    // You may wish to keep it disabled while in development mode.
    disabled: () => process.env.NODE_ENV === 'development',
    // This function determines if a route should be excluded from personalization.
    // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to exclude more.
    // This is an important performance consideration since Next.js Edge middleware runs on every request.
    excludeRoute: () => false,
    defaultHostname: env.proxyHost,
}

export type CdpServiceConfig = {
  /**
   * Your Sitecore Edge Platform endpoint
   * Default is https://edge-platform.sitecorecloud.io
   */
  sitecoreEdgeUrl?: string;
  /**
   * Your unified Sitecore Edge Context Id
   */
  sitecoreEdgeContextId: string;
  /**
   * The Sitecore CDP channel to use for events. Uses 'WEB' by default.
   */
  channel?: string;
  /**
   * Currency for CDP request. Uses 'USA' as default.
   */
  currency?: string;
  /**
   * Timeout (ms) for CDP request. Default is 400.
   */
  timeout?: number;
};

export type PersonalizeConfig = {
  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   * @param {NextRequest} [req] request object from middleware handler
   * @param {NextResponse} [res] response object from middleware handler
   */
  disabled?: (req?: IncomingMessage, res?: OutgoingMessage) => boolean;
  /**
   * Function used to determine if route should be excluded.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * Fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname: string;
  /**
   * Site resolution implementation by name/hostname
   */
  // siteResolver: SiteResolver;
  /**
   * Configuration for your Sitecore Experience Edge endpoint
   */
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  /**
   * Configuration for your Sitecore CDP endpoint
   */
  cdpConfig: CdpServiceConfig;
  /**
   * Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments
   */
  scope?: string;
};

/**
 * Object model of Experience Context data
 */
export type ExperienceParams = {
  referrer: string;
  utm: {
    [key: string]: string | undefined;
    campaign: string | undefined;
    source: string | undefined;
    medium: string | undefined;
    content: string | undefined;
  };
};

/**
 * Object model of personalize execution data
 */
type PersonalizeExecution = {
  friendlyId: string;
  variantIds: string[];
};

export class PersonalizeHelper {
  private personalizeService: GraphQLPersonalizeService;

  constructor(protected config: PersonalizeConfig) {
    this.personalizeService = new GraphQLPersonalizeService({
      ...config.edgeConfig,
    });
  }

  protected getLanguage(): string {
    return 'en';
  }

  protected getHostHeader(req: IncomingMessage): string {
    return req.headers['host']?.split(':')[0];
  }

  protected extractDebugHeaders(incomingHeaders: IncomingHttpHeaders) {
    const headers = {} as { [key: string]: string };
    [].concat(incomingHeaders).forEach((value, key) => (headers[key] = value));
    return headers;
  }

  personalizeLayout(layoutData: LayoutServiceData,variantIds: string[]) {
    const personalizeData = getGroomedVariantIds(variantIds);
    const personalizedPlaceholders = personalizeLayout(
        layoutData,
        personalizeData.variantId,
        personalizeData.componentVariantIds
      );
    const personalizedLayout = {...layoutData };
    personalizedLayout.sitecore.route.placeholders = personalizedPlaceholders;
    return personalizedLayout;
  }

  protected initPersonalizeServer({
    hostname,
    siteName,
    request,
    response,
  }: {
    hostname: string;
    siteName: string;
    request: IncomingMessage;
    response: OutgoingMessage;
  }): void {
    CloudSDK(request, response, {
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
    const url = new URL(req.url, env.proxyHost);
    const utm = {
      campaign: url.searchParams.get('utm_campaign') || undefined,
      content: url.searchParams.get('utm_content') || undefined,
      medium: url.searchParams.get('utm_medium') || undefined,
      source: url.searchParams.get('utm_source') || undefined,
    };

    return {
      // It's expected that the header name "referer" is actually a misspelling of the word "referrer"
      // req.referrer is used during fetching to determine the value of the Referer header of the request being made,
      // used as a fallback
      referrer: req.headers['referer'] || [req.headers.referrer].join(),
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

  getVariantIds = async (req: IncomingMessage, res: OutgoingMessage, path?: string): Promise<string[]> => {
    const url = new URL(req.url, env.proxyHost);
    const pathname = path || url.pathname;
    const language = this.getLanguage();
    const hostname = this.getHostHeader(req) || this.config.defaultHostname;
    // const startTimestamp = Date.now();
    const timeout = this.config.cdpConfig.timeout;

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res;

    debug.personalize('personalize middleware start: %o', {
      pathname,
      language,
      hostname,
      headers: this.extractDebugHeaders(req.headers),
    });

    if (this.config.disabled && this.config.disabled(req, response)) {
      debug.personalize('skipped (personalize middleware is disabled)');
      return [];
    }

    //const site = this.getSite(req, response);

    // Get personalization info from Experience Edge
    const personalizeInfo = await this.personalizeService.getPersonalizeInfo(
      pathname,
      language,
      env.sitecoreSiteName
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
      siteName: env.sitecoreSiteName,
      request: req,
      response,
    });

    const params = this.getExperienceParams(req);
    const executions = this.getPersonalizeExecutions(personalizeInfo, language);
    const identifiedVariantIds: string[] = [];
    debug.personalize(`CDP timeout is ${timeout}`);
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

    if (identifiedVariantIds.length === 0) {
      debug.personalize('skipped (no variant(s) identified)');
      return [];
    }
    return identifiedVariantIds;
  };
}

export const personalizeHelper = new PersonalizeHelper(defaultPersonalizeConfig);
