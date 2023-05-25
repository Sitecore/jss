import { ComponentFile, PackageDefinition, Project, getItems } from '../utils';

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
 * Get projects registered in an app from a path
 * @param {string} path
 */
export function getProjectList(path: string): Project[] {
  const projects = getItems<Project>({
    path,
    resolveItem: (path, name) => ({
      projectName: name,
      componentsPath: `${path}/components`,
    }),
    cb: (name) => console.debug(`Registering JSS project ${name}`),
    recursive: false,
  });

  return projects;
}
