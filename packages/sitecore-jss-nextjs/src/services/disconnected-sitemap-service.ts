import { ItemDefinition, ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
import { StaticPath } from './graphql-sitemap-service';

export class DisconnectedSitemapService {
  /**
   * Provides ability to generate sitemap using manifest.
   * Sitemap can be used for `next export`
   * You can use `sitecore/manifest/sitecore-import.json` as manifest
   * @param {ManifestInstance} manifest manifest instance
   */
  constructor(private manifest: ManifestInstance) {}

  /**
   * Generates sitemap which could be used for generation of static pages during `next export` in disconnected mode.
   * Since i18n is not supported, the output paths will not include a `locale` property.
   */
  fetchExportSitemap(): StaticPath[] {
    const sitemap: {
      params: {
        routePath: string[];
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
              routePath: routePath,
            },
          });
        }

        if (route.children) {
          // If we are in the root route, so next child should not contain paths in array
          processRoutes(route.children as ItemDefinition[], path ? routePath : []);
        }
      });
    };

    processRoutes(this.manifest.items.routes);

    return sitemap;
  }
}
