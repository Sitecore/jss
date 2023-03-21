import { DisconnectedSitemapService, constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
import { SitemapFetcherPlugin } from '..';

class DisconnectedSitemapServicePlugin implements SitemapFetcherPlugin {
  _disconnectedSitemapService: DisconnectedSitemapService;

  constructor() {
    this._disconnectedSitemapService = new DisconnectedSitemapService(
      this.getManifest() as unknown as ManifestInstance
    );
  }

  /**
   * Get sitecore-import.json manifest
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getManifest() {
    if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) return null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const manifest = require('sitecore/manifest/sitecore-import.json');

      return manifest;
    } catch (error) {
      throw Error(
        "[Disconnected Export] Please make sure you've started the disconnected proxy `npm run start:disconnected-proxy`"
      );
    }
  }

  async exec() {
    // If we are in Export mode
    if (process.env.EXPORT_MODE) {
      // Disconnected Export mode
      if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
        return this._disconnectedSitemapService.fetchExportSitemap();
      }
    }

    return [];
  }
}

export const disconnectedSitemapServicePlugin = new DisconnectedSitemapServicePlugin();
