import * as plugins from 'temp/path-extractor-plugins';

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation to extract sitecore path
   */
  exec(path: string): string;
}

export class PathExtractor {
  /**
   * Allow plugins to remove their path rewrite components
   * @param {string} path
   * @see SitecorePageProps
   */
  public extract(path: string): string {
    const newPath = (Object.values(plugins) as Plugin[])
      .sort((p1, p2) => p1.order - p2.order)
      .reduce((result, plugin) => {
        const newPath = plugin.exec(result);
        return newPath;
      }, path);

    return newPath;
  }
}

export const pathExtractor = new PathExtractor();
