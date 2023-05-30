import path from 'path';
import fs from 'fs';
import { getComponentBuilderTemplate } from './templates/component-builder';
import { PackageDefinition } from '../types';
import { watchItems, getComponentList } from '../utils';

const componentBuilderOutputPath = 'src/temp/componentBuilder.js';

export function generateComponentBuilder({
  componentRootPath = 'src/components',
  packages,
  watch,
}: {
  componentRootPath: string;
  packages?: PackageDefinition[];
  watch?: boolean;
}) {
  if (watch) {
    watchComponentBuilder(componentRootPath, packages);
  } else {
    writeComponentBuilder(componentRootPath, packages);
  }
}

export function watchComponentBuilder(componentRootPath: string, packages?: PackageDefinition[]) {
  console.log(`Watching for changes to component builder sources in ${componentRootPath}...`);

  watchItems([componentRootPath], writeComponentBuilder.bind(null, componentRootPath, packages));
}

export function writeComponentBuilder(
  componentRootPath: string,
  packages: PackageDefinition[] = []
) {
  const components = getComponentList(componentRootPath);

  components.unshift(...packages);

  const componentBuilderPath = path.resolve(componentBuilderOutputPath);
  const fileContent = getComponentBuilderTemplate(components, componentBuilderPath);
  console.log(`Writing component builder to ${componentBuilderPath}`);
  fs.writeFileSync(componentBuilderPath, fileContent, {
    encoding: 'utf8',
  });
}
