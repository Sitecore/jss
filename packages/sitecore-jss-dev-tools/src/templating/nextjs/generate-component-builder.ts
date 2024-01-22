import path from 'path';
import fs from 'fs';
import { getComponentBuilderTemplate } from './templates/component-builder';
import { ComponentFile, PackageDefinition, getComponentList } from '../components';
import { watchItems } from '../utils';

// Default destination path for component builder
const defaultComponentBuilderOutputPath = 'src/temp/componentBuilder.ts';
const defaultComponentRootPath = 'src/components';

/**
 * Generate component builder based on provided settings
 * @param {Object} [settings] settings for component builder generation
 * @param {string} [settings.componentRootPath] path to components root
 * @param {string} [settings.componentBuilderOutputPath] path to component builder output
 * @param {PackageDefinition[]} [settings.packages] list of packages to include in component builder
 * @param {ComponentFile[]} [settings.components] list of components to include in component builder
 * @param {boolean} [settings.watch] whether to watch for changes to component builder sources
 */
export function generateComponentBuilder({
  componentRootPath = defaultComponentRootPath,
  componentBuilderOutputPath = defaultComponentBuilderOutputPath,
  packages = [],
  components = [],
  watch,
}: {
  componentRootPath?: string;
  componentBuilderOutputPath?: string;
  packages?: PackageDefinition[];
  components?: ComponentFile[];
  watch?: boolean;
} = {}) {
  if (watch) {
    watchComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages, components });
  } else {
    writeComponentBuilder({ componentRootPath, componentBuilderOutputPath, packages, components });
  }
}

/**
 * Watch for changes to component builder sources
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {string} settings.componentBuilderOutputPath path to component builder output
 * @param {PackageDefinition[]} settings.packages list of packages to include in component builder
 * @param {ComponentFile[]} settings.components list of components to include in component builder
 */
export function watchComponentBuilder({
  componentRootPath,
  componentBuilderOutputPath,
  packages,
  components,
}: {
  componentRootPath: string;
  componentBuilderOutputPath: string;
  packages: PackageDefinition[];
  components: ComponentFile[];
}) {
  console.log(`Watching for changes to component builder sources in ${componentRootPath}...`);

  watchItems(
    [componentRootPath],
    writeComponentBuilder.bind(null, {
      componentRootPath,
      componentBuilderOutputPath,
      packages,
      components,
    })
  );
}

/**
 * Write component builder to file
 * @param {Object} settings settings for component builder generation
 * @param {string} settings.componentRootPath path to components root
 * @param {string} settings.componentBuilderOutputPath path to component builder output
 * @param {PackageDefinition[]} settings.packages list of packages to include in component builder
 * @param {ComponentFile[]} settings.components list of components to include in component builder
 */
export function writeComponentBuilder({
  componentRootPath,
  componentBuilderOutputPath,
  packages,
  components,
}: {
  componentRootPath: string;
  componentBuilderOutputPath: string;
  packages: PackageDefinition[];
  components: ComponentFile[];
}) {
  const items: (ComponentFile | PackageDefinition)[] = [
    ...packages,
    ...components,
    ...getComponentList(componentRootPath),
  ];

  const componentBuilderPath = path.resolve(componentBuilderOutputPath);
  const fileContent = getComponentBuilderTemplate(items);
  console.log(`Writing component builder to ${componentBuilderPath}`);
  fs.writeFileSync(componentBuilderPath, fileContent, {
    encoding: 'utf8',
  });
}
