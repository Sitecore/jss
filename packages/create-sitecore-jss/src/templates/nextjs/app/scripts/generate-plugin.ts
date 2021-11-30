import fs from 'fs';
import path from 'path';
import { getItems } from './utils';

/*
  PLUGINS GENERATION
  NOTE: pluginName: the name of the plugin in the src/lib folder
  Generates the `/src/temp/{pluginName}-plugins.ts` file, which exports list of plugins

  Generating the plugins is optional, and it can be maintained manually if preferred.

  The default convention uses the plugin's filename (without the extension) as the first part of the component
  name. For example, the file `/lib/page-props-factory/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
  This can be customized in writePlugins().
*/

const sitemapFetcherPluginListPath = path.resolve('src/temp/sitemap-fetcher-plugins.ts');
const pagePropsFactoryPluginListPath = path.resolve('src/temp/page-props-factory-plugins.ts');
const sitemapFetcherPluginsRootPath = 'src/lib/sitemap-fetcher/plugins';
const pagePropsFactoryPluginsRootPath = 'src/lib/page-props-factory/plugins';

const paths = [
  {
    pluginListPath: sitemapFetcherPluginListPath,
    pluginsRootPath: sitemapFetcherPluginsRootPath,
  },
  {
    pluginListPath: pagePropsFactoryPluginListPath,
    pluginsRootPath: pagePropsFactoryPluginsRootPath,
  },
];

interface Paths {
  pluginListPath: string;
  pluginsRootPath: string;
}

interface PluginFile {
  path: string;
  name: string;
}

run(paths);

function run(paths: Paths[]) {
  paths.forEach((path) => {
    writePlugins(path.pluginListPath, path.pluginsRootPath);
  });
}

/**
 * Generates the plugins file and saves it to the filesystem.
 * By convention, we expect to find plugins under src/lib/{pluginName}/plugins/** (subfolders are
 * searched recursively). The filename, with extension and non-word characters
 * stripped, is used to identify the plugin's JavaScript module definition (for adding
 * new plugin to the factory).
 * Modify this function to use a different convention.
 */
function writePlugins(pluginListPath: string, pluginsRootPath: string) {
  const pluginName = pluginsRootPath.split('/')[2];
  const plugins = getPluginList(pluginsRootPath, pluginName);

  const fileContent = plugins
    .map((plugin) => {
      return `export { ${plugin.name} } from '${plugin.path}';`;
    })
    .join('\r\n')
    .concat('\r\n');

  console.log(`Writing ${pluginName} plugins to ${pluginListPath}`);
  fs.writeFileSync(pluginListPath, fileContent, {
    encoding: 'utf8',
  });
}

function getPluginList(path: string, pluginName: string): PluginFile[] {
  const plugins = getItems<PluginFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      name: `${name.replace(/[^\w]+/g, '')}Plugin`,
    }),
    cb: (name) => console.debug(`Registering ${pluginName} plugin ${name}`),
  });

  return plugins;
}
