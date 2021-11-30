import { DisconnectedSitemapService } from '@sitecore-jss/sitecore-jss-nextjs';
// #START_EMPTY
import { ManifestInstance } from '@sitecore-jss/sitecore-jss-dev-tools';
import { SitemapFetcherPlugin } from '..';
// #END_EMPTY

class DisconnectedSitemapServicePlugin implements SitemapFetcherPlugin {
  _disconnectedSitemapService: DisconnectedSitemapService;

  constructor() {
    // #START_EMPTY
    this._disconnectedSitemapService = new DisconnectedSitemapService(
      this.getManifest() as unknown as ManifestInstance
    );
    // #END_EMPTY
  }

  /**
   * Get sitecore-import.json manifest
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getManifest() {
    if (process.env.JSS_MODE !== 'disconnected') return null;

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
      // #START_EMPTY
      // Disconnected Export mode
      if (process.env.JSS_MODE === 'disconnected') {
        return this._disconnectedSitemapService.fetchExportSitemap();
      }
      // #END_EMPTY
    }

    return [];
  }
}

export const disconnectedSitemapServicePlugin = new DisconnectedSitemapServicePlugin();
