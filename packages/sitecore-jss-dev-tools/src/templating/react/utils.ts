import { ComponentFile, PackageDefinition } from '../types';
import { getItems } from '../utils';

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
