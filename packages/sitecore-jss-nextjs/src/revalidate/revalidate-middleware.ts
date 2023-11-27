import { NextApiResponse, NextApiRequest } from 'next';
import { GraphQLPersonalizeService } from '@sitecore-jss/sitecore-jss/personalize';
import { GraphQLRequestClientFactory } from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';

enum EntityDefinition {
  LayoutData = 'LayoutData',
  Item = 'Item',
  // Add other entity definitions as needed
}

/**
 * Object model of each updated entity returned from the webhook payload
 */
export type Entity = {
  identifier: string;
  entity_definition: EntityDefinition;
  operation: string;
  entity_culture: string;
};

/**
 * Object model for updated paths returned from the webhook payload
 */
export type UpdatedPaths = {
  path: string;
  language: string;
};

/**
 *  Object model for personalized results from GraphqlPersonalizeService
 */
export type PersonalizedResult = {
  path: string;
  variantId: string;
};

export type RevalidateConfig = {
  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory: GraphQLRequestClientFactory;
  /**
   * Whether multisite is configured
   * Default is false
   */
  multiSite?: boolean;
  /**
   * Whether personalization is configured
   * Default is false
   */
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

  /**
   * Extracts the paths from the updated paths
   * @param {UpdatedPaths[]} filteredUpdates Updated paths
   * @returns {string[]} paths
   */
  protected extractPaths(filteredUpdates: UpdatedPaths[]) {
    return filteredUpdates.map((update) => update.path);
  }

  /**
   * Gets the site name from the path name
   * @param {string} pathname Path name
   * @returns {string} site name
   */
  protected getSiteName(pathname: string) {
    let siteName = '';

    const path = pathname.endsWith('/') ? pathname : pathname + '/';
    const result = path.match('(.*?)\\/');

    if (result && result[1] !== '') {
      siteName = result[1];
    }

    return siteName;
  }

  /**
   * Gets the path name from the full path
   * @param {string} fullPath Full path
   * @returns {string} path name
   */
  protected getPathName(fullPath: string) {
    const pathParts = fullPath.split('/').filter((part) => part !== '');

    if (pathParts.length >= 2) {
      const siteName = `/${pathParts[0]}/`;
      const path = `/${pathParts.slice(1).join('/')}`;
      return path.startsWith(siteName) ? path.slice(siteName.length) : path;
    }

    return '/';
  }

  /**
   * Filters out the updated paths and language from the request body
   * @param {NextApiRequest} req Next.js API request
   * @returns {UpdatedPaths[]} updated paths
   */
  protected getFilteredUpdates(req: NextApiRequest): UpdatedPaths[] {
    if (!req.body?.updates || this.isEmpty(req.body.updates)) {
      return [];
    }

    return req.body?.updates
      .filter(
        (update: Entity) =>
          update.entity_definition === EntityDefinition.LayoutData && update.entity_culture
      )
      .map((update: Entity) => {
        return {
          path: update.identifier,
          language: update.entity_culture,
        };
      });
  }

  /**
   * Gets the rewrite paths for the updated paths
   * @param {PersonalizedResult[]} personalizeInfo Personalized results
   * @param {boolean} multiSite Whether multisite is configured
   * @returns {string[]} rewrite paths
   */
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
          personalizeInfo.variantIds.forEach((variantId: string) => {
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

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // filter out updated paths and language from request.body
    const filteredUpdates = this.getFilteredUpdates(req);

    if (this.isEmpty(filteredUpdates)) {
      // nothing to revalidate
      return res.status(204).json({ message: 'No updates to revalidate' });
    }

    // extract only paths from filtered updates object
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
      // revalidate all the collected paths
      await Promise.all(pathsToRevalidate.map((path: string) => res.revalidate(path)));
      debug.revalidate(`revalidated paths: ${pathsToRevalidate.join(', ')}`);
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      debug.revalidate(`error: ${error}`);
      return res.status(500).json({ message: error });
    }
  };
}
