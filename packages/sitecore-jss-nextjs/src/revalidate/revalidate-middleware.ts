import { NextApiResponse, NextApiRequest } from 'next';
import { GraphQLPersonalizeService } from '@sitecore-jss/sitecore-jss/personalize';
import { GraphQLRequestClientFactory } from '@sitecore-jss/sitecore-jss/graphql';

export type Entity = {
  identifier: string;
  entity_definition: string;
  operation: string;
  entity_culture: string;
};

export type UpdatedPaths = {
  path: string;
  language: string;
};

export type PersonalizedResult = {
  path: string;
  variantId: string;
};

export type RevalidateConfig = {
  clientFactory: GraphQLRequestClientFactory;
  multiSite?: boolean;
  personalize?: boolean;
};

const SITE_PREFIX = '_site_';
const PERSONALIZE_PREFIX = '_variantId_';

/**
 * Middleware / handler for on-demand ISR (e.g. '/api/revalidate').
 */
export class RevalidateMiddleware {
  private personalizeService: GraphQLPersonalizeService;

  constructor(protected config: RevalidateConfig) {
    this.personalizeService = new GraphQLPersonalizeService({
      clientFactory: config.clientFactory,
    });
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  protected isEmpty(data: UpdatedPaths[]) {
    return data.length === 0;
  }

  protected extractPaths(filteredUpdates: UpdatedPaths[]) {
    return filteredUpdates.map((update) => update.path);
  }

  protected getSiteName(pathname: string) {
    let siteName = '';

    const path = pathname.endsWith('/') ? pathname : pathname + '/';
    const result = path.match('(.*?)\\/');

    if (result && result[1] !== '') {
      siteName = result[1];
    }

    return siteName;
  }

  protected getPathName(fullPath: string) {
    const pathParts = fullPath.split('/').filter((part) => part !== '');

    if (pathParts.length >= 2) {
      const siteName = `/${pathParts[0]}/`;
      const path = `/${pathParts.slice(1).join('/')}`;
      return path.startsWith(siteName) ? path.slice(siteName.length) : path;
    }

    return '/';
  }

  protected getFilteredUpdates(req: NextApiRequest): UpdatedPaths[] {
    if (!req.body?.updates || this.isEmpty(req.body.updates)) {
      return [];
    }

    return req.body?.updates
      .filter(
        (update: Entity) => update.entity_definition === 'LayoutData' && update.entity_culture
      )
      .map((update: Entity) => {
        return {
          path: update.identifier,
          language: update.entity_culture,
        };
      });
  }

  protected getRewritePaths(
    personalizeInfo: (PersonalizedResult | { path: string })[],
    multiSite?: boolean
  ): string[] {
    return personalizeInfo.flatMap((info) => {
      const sitePrefix = multiSite ? SITE_PREFIX : '';
      let pathWithPrefix = '';

      if ('variantId' in info && info.variantId) {
        pathWithPrefix = `/${PERSONALIZE_PREFIX}${info.variantId}/${sitePrefix}${info.path}`;
      } else {
        pathWithPrefix = `/${sitePrefix}${info.path}`;
      }

      return pathWithPrefix;
    });
  }

  /**
   * Gets personalized results for the updated paths
   * @param {UpdatedPaths[]} filteredUpdates Updated paths
   * @returns {Promise<{ personalized: PersonalizedResult[]; nonPersonalized: { path: string }[] }>} personalized results
   */
  protected async getPersonalizedResults(filteredUpdates: UpdatedPaths[]) {
    const personalizedResults: PersonalizedResult[] = [];
    const nonPersonalizedResults: { path: string }[] = [];

    await Promise.all(
      filteredUpdates.map(async (update) => {
        const siteName = this.getSiteName(update.path);
        const pathName = this.getPathName(update.path);
        const personalizeInfo = await this.personalizeService.getPersonalizeInfo(
          pathName,
          update.language,
          siteName
        );

        if (personalizeInfo && personalizeInfo.variantIds.length > 0) {
          personalizeInfo.variantIds.forEach((variantId) => {
            personalizedResults.push({
              path: update.path,
              variantId,
            });
          });
        } else {
          // Collect paths without personalized info
          nonPersonalizedResults.push({
            path: update.path,
          });
        }
      })
    );

    return {
      personalized: personalizedResults,
      nonPersonalized: nonPersonalizedResults,
    };
  }

  /**
   * Handler for the Next.js API route
   * @param {NextApiRequest}  req   Next.js API request
   * @param {NextApiResponse} res Next.js API response
   * @returns Promise
   */
  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // filter out updated paths and language from request.body
    const filteredUpdates = this.getFilteredUpdates(req);

    if (this.isEmpty(filteredUpdates)) {
      // nothing to revalidate
      return res.status(204).json({});
    }

    const paths = this.extractPaths(filteredUpdates);

    const pathsToRevalidate: string[] = [];

    // when multiSite and personalization both are configured or only personalization is configured
    if (this.config.personalize) {
      const personalizeInfo = await this.getPersonalizedResults(filteredUpdates);
      const personalizedRewritePaths = this.getRewritePaths(
        personalizeInfo.personalized,
        this.config.multiSite
      );
      const nonPersonalizedRewritePaths = this.getRewritePaths(
        personalizeInfo.nonPersonalized,
        this.config.multiSite
      );
      pathsToRevalidate.push(...personalizedRewritePaths, ...nonPersonalizedRewritePaths);
    }

    // when only multiSite is configured but personalization is not
    if (this.config.multiSite && !this.config.personalize) {
      const multiSitePaths = paths.map((path: string) => `/${SITE_PREFIX}${path}`);
      pathsToRevalidate.push(...multiSitePaths);
    }

    // when both multisite and personalization are not configured
    if (!this.config.multiSite && !this.config.personalize) {
      const defaultPaths = paths.map((path: string) => this.getPathName(path));
      pathsToRevalidate.push(...defaultPaths);
    }

    try {
      await Promise.all(pathsToRevalidate.map((path: string) => res.revalidate(path)));
      console.log(`[api/revalidate] revalidate: ${pathsToRevalidate.join(', ')}`);
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error(`[api/revalidate] error: ${error}`);
      return res.status(500).json({ message: 'Error revalidating' });
    }
  };
}
