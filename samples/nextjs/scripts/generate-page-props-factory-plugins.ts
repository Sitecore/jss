import fs from 'fs';
import path from 'path';
import { getItems } from './utils';

/*
  PAGE PROPS FACTORY PLUGINS GENERATION
  Generates the `/src/temp/page-props-factory-plugins.ts` file, which exports list of plugins

  Generating the page-props-factory-plugins is optional, and it can be maintained manually if preferred.

  The default convention uses the plugin's filename (without the extension) as the first part of the component
  name. For example, the file `/lib/page-props-factory/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
  This can be customized in writePlugins().

  This script supports two modes. In default mode, the plugins file is written once.
  In watch mode, the plugins source folder is watched, and page-props-factory-plugins.ts is
  regenerated whenever files are added or deleted. Run in watch mode by passing a `--watch` argument
  when calling the script.
*/

const pluginListPath = path.resolve('src/temp/page-props-factory-plugins.ts');
const pluginsRootPath = 'src/lib/page-props-factory/plugins';

writePlugins();

interface PluginFile {
  path: string;
  name: string;
}

/**
 * Generates the page props plugins factory file and saves it to the filesystem.
 * By convention, we expect to find plugins under src/lib/page-props-factory/plugins/** (subfolders are
 * searched recursively). The filename, with extension and non-word characters
 * stripped, is used to identify the plugin's JavaScript module definition (for adding
 * new plugin to the factory).
 * Modify this function to use a different convention.
 */
function writePlugins() {
  const plugins = getPluginList(pluginsRootPath);

  const fileContent = plugins
    .map((plugin) => {
      return `export { ${plugin.name} } from '${plugin.path}';`;
    })
    .join('\r\n')
    .concat('\r\n');

  console.log(`Writing page props factory plugins to ${pluginListPath}`);
  fs.writeFileSync(pluginListPath, fileContent, {
    encoding: 'utf8',
  });
}

function getPluginList(path: string): PluginFile[] {
  const plugins = getItems<PluginFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      name: `${name.replace(/[^\w]+/g, '')}Plugin`,
    }),
    cb: (name) => console.debug(`Registering page props factory plugin ${name}`),
  });

  return plugins;
}
