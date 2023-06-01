import path from 'path';
import fs from 'fs';
import { getComponentBuilderTemplate } from './templates/component-builder';
import { PackageDefinition, getComponentList } from '../components';
import { watchItems } from '../utils';

// Default destination path for component builder
const componentBuilderOutputPath = 'src/temp/componentBuilder.js';

/**
 * Generate component builder based on provided settings
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {PackageDefinition[]} settings.packages list of packages to include in component builder
 * @param {boolean} settings.watch whether to watch for changes to component builder sources
 */
export function generateComponentBuilder({
  componentRootPath = 'src/components',
  packages,
  watch,
}: {
  componentRootPath?: string;
  packages?: PackageDefinition[];
  watch?: boolean;
}) {
  if (watch) {
    watchComponentBuilder(componentRootPath, packages);
  } else {
    writeComponentBuilder(componentRootPath, packages);
  }
}

/**
 * Watch for changes to component builder sources
 * @param {string} componentRootPath root path to components
 * @param {PackageDefinition[]} [packages] packages to include in component builder
 */
export function watchComponentBuilder(componentRootPath: string, packages?: PackageDefinition[]) {
  console.log(`Watching for changes to component builder sources in ${componentRootPath}...`);

  watchItems([componentRootPath], writeComponentBuilder.bind(null, componentRootPath, packages));
}

/**
 * Write component builder to file
 * @param {string} componentRootPath root path to components
 * @param {PackageDefinition[]} [packages] packages to include in component builder
 */
export function writeComponentBuilder(
  componentRootPath: string,
  packages: PackageDefinition[] = []
) {
  const components = getComponentList(componentRootPath);

  components.unshift(...packages);

  const componentBuilderPath = path.resolve(componentBuilderOutputPath);
  const fileContent = getComponentBuilderTemplate(components, componentBuilderPath);
  console.log(`Writing component builder to ${componentBuilderPath}`);
  console.log('FILE CONTENT!!!', componentBuilderPath, fileContent);
  fs.writeFileSync(componentBuilderPath, fileContent, {
    encoding: 'utf8',
  });
}
