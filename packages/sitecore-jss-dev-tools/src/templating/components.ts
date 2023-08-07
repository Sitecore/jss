import { getItems } from './utils';

/**
 * Describes a file that represents a component definition
 */
export interface ComponentFile {
  path: string;
  moduleName: string;
  componentName: string;
}

/**
 * Describes a package and components to be imported
 */
export interface PackageDefinition {
  name: string;
  components: {
    moduleName: string;
    componentName: string;
  }[];
  defaultImport?: {
    useDefault: boolean;
    defaultAlias: string;
  };
}

/**
 * Get list of components from @var path
 * Returns a list of components in the following format:
 * {
 *  path: 'path/to/component',
 *  componentName: 'ComponentName',
 *  moduleName: 'ComponentName'
 * }
 * @param {string} path path to search
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

  return components.map((component) => {
    // Check if it's a PackageDefinition and set the defaultImport property
    if ('components' in component) {
      const pkg = component as PackageDefinition;
      const defaultImport =
        pkg.defaultImport && pkg.defaultImport.useDefault ? pkg.defaultImport : undefined;
      return { ...pkg, defaultImport };
    }
    return component; // Return unchanged for ComponentFile
  });
}
