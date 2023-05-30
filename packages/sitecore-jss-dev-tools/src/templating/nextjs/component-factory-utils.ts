import { Project } from '../types';
import { getItems } from '../utils';

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
