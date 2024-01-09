import fs from 'fs';
import path from 'path';
import generateComponentFactory, {
  ComponentFile
} from './templates/component-factory';
import { getItems } from './utils';

const componentFactoryPath = path.resolve('src/temp/component-factory.astro');
const tempFolderPath = path.resolve('src') + '/temp';
const componentRootPath = 'src/components';

writeComponentFactory();

function writeComponentFactory() {
  const components = getComponentList(componentRootPath);
  const fileContent = generateComponentFactory(components);
  console.log(`Writing component factory to ${componentFactoryPath}`);
  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath);
  }
  fs.writeFileSync(componentFactoryPath, fileContent, {
    encoding: 'utf8',
  });
}

function getComponentList(path: string): (ComponentFile)[] {
  const components = getItems<ComponentFile>({
    path,
    resolveItem: (path: string, name: string) => ({
      path: `../../${path}/${name}.astro`,
      componentName: name,
      moduleName: name.replace(/[^\w]+/g, ''),
    }),
    cb: (name: string) => console.debug(`Registering JSS component ${name}`),
  });

  return components;
}
