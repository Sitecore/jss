import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import {
  ComponentFile,
  GetItemsSettings,
  ModuleType,
  PackageDefinition,
  PluginFile,
} from './types';

/**
 * Using @var path find all files recursively and generate output using @var resolveItem by calling it for each file
 * @param {GetItemsSettings} settings
 * @returns {Item[]} items
 */
export function getItems<Item>(settings: GetItemsSettings<Item>): Item[] {
  const {
    recursive = true,
    path,
    resolveItem,
    cb,
    fileFormat = new RegExp(/(.+)(?<!\.d)\.[jt]sx?$/),
  } = settings;
  const items: Item[] = [];
  const folders: fs.Dirent[] = [];

  if (!fs.existsSync(path)) return [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      folders.push(item);
    }

    if (fileFormat.test(item.name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = item.name.match(fileFormat)![1];
      items.push(resolveItem(path, name));
      cb && cb(name);
    }
  });

  for (const folder of folders) {
    recursive
      ? items.push(
          ...getItems<Item>({
            path: `${path}/${folder.name}`,
            resolveItem,
            cb,
            fileFormat,
          })
        )
      : items.push(resolveItem(`${path}/${folder.name}`, folder.name));
  }

  return items;
}

/**
 * Generates the plugins file and saves it to the filesystem.
 * By convention, we expect to find plugins under {pluginName}/plugins/** (subfolders are
 * searched recursively). The filename, with extension and non-word characters
 * stripped, is used to identify the plugin's JavaScript module definition (for adding
 * new plugin to the factory).
 * @param {Object} definition plugin definition
 * @param {string} definition.listPath path to write plugins to
 * @param {string} definition.rootPath plugin source path
 * @param {string} definition.moduleType module type: CJS or ESM
 * @param {boolean} [definition.relative] whether to use relative paths in the generated file. By default, absolute paths are used.
 */
export function writePlugins(definition: {
  listPath: string;
  rootPath: string;
  moduleType: ModuleType;
  relative?: boolean;
}) {
  const { rootPath, listPath, moduleType, relative } = definition;
  const segments = rootPath.split('/');
  const pluginName = segments[segments.length - 2];
  const plugins = getPluginList(rootPath, pluginName);
  let fileContent = '';

  fileContent = plugins
    .map((plugin) => {
      const sourcePath = relative
        ? path.relative(path.dirname(listPath), plugin.path).replace(/\\/g, '/')
        : plugin.path;

      return moduleType === ModuleType.CJS
        ? `exports.${plugin.name} = require('${sourcePath.replace('src/', '../')}');`
        : `export { ${plugin.name} } from '${sourcePath}';`;
    })
    .join('\r\n')
    .concat('\r\n');

  if (!plugins.length) {
    fileContent = moduleType === ModuleType.CJS ? 'module.exports = {};\r\n' : 'export {};\r\n';
  }

  const filePath = path.resolve(listPath);
  console.log(`Writing ${pluginName} plugins to ${filePath}`);
  fs.writeFileSync(filePath, fileContent, {
    encoding: 'utf8',
  });
}

/**
 * @param {string} path path to get plugin from
 * @param {string} pluginName plugin name
 */
export function getPluginList(path: string, pluginName: string): PluginFile[] {
  const plugins = getItems<PluginFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      name: `${name.replace(/-./g, (x) => x[1].toUpperCase())}Plugin`,
    }),
    cb: (name) => console.debug(`Registering ${pluginName} plugin ${name}`),
  });

  return plugins;
}

/**
 * Creates a file relative to the specified path if the file doesn't exist. Creates directories as needed.
 * @param {string} rootPath - the root path
 * @param {string} fileContent - the file content
 * @param {string} filename - the filename
 * @param {string} componentPath - path to put components into
 * @returns the new file's filepath
 */
export function scaffoldFile(
  rootPath: string,
  fileContent: string,
  filename: string,
  componentPath?: string
): string | null {
  const outputDir = componentPath ? path.join(rootPath, componentPath) : rootPath;
  const outputFile = path.join(outputDir, filename);

  if (fs.existsSync(outputFile)) {
    console.log(chalk.red(`Skipping creating ${outputFile}; already exists.`));
    return null;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, editLineEndings(fileContent), 'utf8');
  console.log(chalk.green(`File ${outputFile} has been scaffolded.`));
  return outputFile;
}

/**
 * Get components from a path in an app
 * @param {string} path
 */
export function getComponentList(path: string): (PackageDefinition | ComponentFile)[] {
  const components = getItems<PackageDefinition | ComponentFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      componentName: name,
      moduleName: name.replace(/[^\w]+/g, ''),
    }),
    cb: (name) => console.debug(`Registering JSS component ${name}`),
  });

  return components;
}

/**
 * Run watch mode, watching on @var paths
 * @param {string[]} paths paths to watch by chokidar
 * @param {Function<void>} componentBuilderCb component builder method to call on changes to watched components
 */
export function watchItems(paths: string[], componentBuilderCb: () => void): void {
  chokidar
    .watch(paths, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', componentBuilderCb)
    .on('unlink', componentBuilderCb);
}

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
export function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}
