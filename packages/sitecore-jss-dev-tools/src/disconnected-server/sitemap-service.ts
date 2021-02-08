/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import { Request, Response } from 'express';
import { ItemDefinition, ManifestInstance } from '@sitecore-jss/sitecore-jss-manifest';

export interface DisconnectedSitemapServiceOptions {
  manifest: ManifestInstance;
  getManifest?: (language: string) => Promise<ManifestInstance>;
}

/**
 * Creates a fake version of the Sitecore Sitemap Service that is powered by your disconnected manifest file
 * @param {DisconnectedSitemapServiceOptions} config
 */
export function createDisconnectedSitemapService({
  manifest,
  getManifest,
}: DisconnectedSitemapServiceOptions) {
  console.log(`🔌  Disconnected ${chalk.red('Sitemap Service')} initializing...⏳`);
  return {
    middleware: async function disconnectedLayoutServiceMiddleware(
      request: Request,
      response: Response
    ) {
      let currentManifest = manifest;

      const language = (request.query.sc_lang ? request.query.sc_lang : 'en') as string;

      // check to see if the language is different than what we have loaded, and if so change it
      // using the callback function if it is provided
      if (currentManifest.language.toUpperCase() !== language.toUpperCase()) {
        if (getManifest && typeof getManifest === 'function') {
          try {
            currentManifest = await getManifest(language);
          } catch (e) {
            console.error(`> [SITEMAP] Error getting manifest in language '${language}'`, e);
            response.sendStatus(500);
            return;
          }
        } else {
          console.error(
            `> [SITEMAP] ERROR: Received request for sitemap in ${language} but the manifest data was in ${currentManifest.language}. To enable switching languages at runtime, please pass 'getManifest: function(newLanguage) { return manifestInNewLanguage; }' in the service creation options.`
          );
          response.sendStatus(404);
          return;
        }
      }

      const sitemap: {
        params: {
          path: string[];
        };
      }[] = [];

      // Path is empty when we start from the root route
      const processRoutes = (routes: ItemDefinition[], path?: string[]) => {
        routes.forEach((route: ItemDefinition) => {
          const renderings = route.layout?.renderings;
          const routePath = path ? path.concat(route.name) : [''];

          if (renderings && renderings.length) {
            sitemap.push({
              params: {
                path: routePath,
              },
            });
          }

          if (route.children) {
            // If we are in the root route, so next child should not contain paths in array
            processRoutes(route.children as ItemDefinition[], path ? routePath : []);
          }
        });
      };

      processRoutes(currentManifest.items.routes);

      response.status(200).json(sitemap);
    },
  };
}
