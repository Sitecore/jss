import fs from 'fs';
import path from 'path';
import { getItems } from './utils';

/**
 * Identifies the format of the module to be compiled
 */
export enum ModuleType {
  CJS,
  ESM,
}

/**
 * Type to specify plugin file details
 */
export interface PluginFile {
  path: string;
  name: string;
}

/**
 * Definition to be used for plugin registration during bootstrap
 */
export interface PluginDefinition {
  /**
   * destination path to compile plugins to
   */
  distPath: string;
  /**
   * source path for where the plugins are defined
   */
  rootPath: string;
  /**
   * CJS or ESM - which type to compile plugins to
   */
  moduleType: ModuleType;
  /**
   * whether to use relative or absolute paths in the generated file. By default, absolute paths are used.
   */
  relative?: boolean;
  /**
   * whether to suppress console output
   */
  silent?: boolean;
}

/**
 * Get list of plugins from @var path
 * Returns a list of plugins in the following format:
 * {
 *   path: 'path/to/plugin/foo',
 *   name: 'fooPlugin'
 * }
 * @example getPluginList('src/foo/plugins', 'Foo')
 * @param {object} definition plugin definition
 * @param {string} definition.path path to get plugin from
 * @param {string} definition.pluginName plugin name
 * @param {boolean} [definition.silent] whether to suppress console output
 */
export function getPluginList({
  path,
  pluginName,
  silent = false,
}: {
  path: string;
  pluginName: string;
  silent?: boolean;
}): PluginFile[] {
  const plugins = getItems<PluginFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      name: `${name.replace(/-./g, (x) => x[1].toUpperCase())}Plugin`,
    }),
    cb: (name) => !silent && console.debug(`Registering ${pluginName} plugin ${name}`),
  });

  return plugins;
}

/**
 * Generates the plugins file and saves it to the filesystem.
 * By convention, we expect to find plugins under {pluginName}/plugins/** (subfolders are searched recursively).
 * generated file will be saved to @var {distPath} and will contain a list of plugins in the following format:
 * CJS: exports.fooPlugin = require('{pluginPath}');
 * ESM: export { fooPlugin } from '{pluginPath}';
 * @example generatePlugins({ distPath: 'src/temp/foo-plugins.js', rootPath: 'src/foo/plugins', moduleType: ModuleType.CJS })
 * @param {PluginDefinition} definition plugin definition
 */
export function generatePlugins(definition: PluginDefinition) {
  const { rootPath, distPath, moduleType, relative = false, silent } = definition;
  const segments = rootPath.split('/');
  const pluginName = segments[segments.length - 2];
  const plugins = getPluginList({ path: rootPath, pluginName, silent });
  let fileContent = '';

  fileContent = plugins
    .map((plugin) => {
      const sourcePath = relative
        ? path.relative(path.dirname(distPath), plugin.path).replace(/\\/g, '/')
        : plugin.path;

      return moduleType === ModuleType.CJS
        ? `exports.${plugin.name} = require('${sourcePath}');`
        : `export { ${plugin.name} } from '${sourcePath}';`;
    })
    .join('\r\n')
    .concat('\r\n');

  if (!plugins.length) {
    fileContent = moduleType === ModuleType.CJS ? 'module.exports = {};\r\n' : 'export {};\r\n';
  }

  const filePath = path.resolve(distPath);
  !silent && console.log(`Writing ${pluginName} plugins to ${filePath}`);

  fs.writeFileSync(filePath, fileContent, {
    encoding: 'utf8',
  });
}
