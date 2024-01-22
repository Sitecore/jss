import path from 'path';
import fs from 'fs';
import { getComponentBuilderTemplate } from './templates/component-builder';
import { ComponentFile, PackageDefinition, getComponentList } from '../components';
import { watchItems } from '../utils';

// Default destination path for component builder
const componentBuilderOutputPath = 'src/temp/componentBuilder.js';
const defaultComponentRootPath = 'src/components';

/**
 * Generate component builder based on provided settings
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {PackageDefinition[]} [settings.packages] list of packages to include in component builder
 * @param {ComponentFile[]} [settings.components] list of components to include in component builder
 * @param {boolean} settings.watch whether to watch for changes to component builder sources
 */
export function generateComponentBuilder({
  componentRootPath = defaultComponentRootPath,
  packages = [],
  components = [],
  watch,
}: {
  componentRootPath?: string;
  packages?: PackageDefinition[];
  components?: ComponentFile[];
  watch?: boolean;
}) {
  if (watch) {
    watchComponentBuilder({ componentRootPath, packages, components });
  } else {
    writeComponentBuilder({ componentRootPath, packages, components });
  }
}

/**
 * Watch for changes to component builder sources
 * @param {object} config configuration for component builder watcher
 * @param {string} config.componentRootPath root path to components
 * @param {PackageDefinition[]} config.packages packages to include in component builder
 * @param {ComponentFile[]} config.components components to include in component builder
 */
export function watchComponentBuilder({
  componentRootPath,
  packages,
  components,
}: {
  componentRootPath: string;
  packages: PackageDefinition[];
  components: ComponentFile[];
}) {
  console.log(`Watching for changes to component builder sources in ${componentRootPath}...`);

  watchItems(
    [componentRootPath],
    writeComponentBuilder.bind(null, { componentRootPath, packages, components })
  );
}

/**
 * Write component builder to file
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath root path to components
 * @param {PackageDefinition[]} settings.packages packages to include in component builder
 * @param {ComponentFile[]} settings.components list of components to include in component builder
 */
export function writeComponentBuilder({
  componentRootPath,
  packages,
  components,
}: {
  componentRootPath: string;
  packages: PackageDefinition[];
  components: ComponentFile[];
}) {
  const items: (ComponentFile | PackageDefinition)[] = [
    ...packages,
    ...components,
    ...getComponentList(componentRootPath),
  ];

  const componentBuilderPath = path.resolve(componentBuilderOutputPath);
  const fileContent = getComponentBuilderTemplate(items, componentBuilderPath);
  console.log(`Writing component builder to ${componentBuilderPath}`);
  fs.writeFileSync(componentBuilderPath, fileContent, {
    encoding: 'utf8',
  });
}
