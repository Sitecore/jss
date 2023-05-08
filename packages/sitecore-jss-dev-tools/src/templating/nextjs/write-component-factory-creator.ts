import fs from 'fs';
import path from 'path';
import { getItems } from '../utils';
import { ComponentFile, PackageDefinition, Project } from '../utils';
import { generateComponentFactoryCreator } from './templates/component-factory-creator';
import { generateProjectComponents } from './templates/project-components';

const componentFactoryCreatorPath = path.resolve('src/temp/componentFactoryCreator.ts');

/**
 * Generates the component factory creator file and saves it to the filesystem.
 * By convention, we expect to find:
 * * React components under src/components/**
 * * Project components under src/projects/<project>/components/**
 * (subfolders are searched recursively).
 * The filename, with the extension stripped, is used for the component's
 * string name (for mapping to Sitecore). The filename, with extension and non-word characters
 * stripped, is used to identify the component's JavaScript module definition (for initializing
 * new component instances in code).
 * Modify this function to use a different convention.
 * @param {string} componentRootPath
 * @param {string} projectRootPath
 */
export function writeComponentFactoryCreator(componentRootPath: string, projectRootPath: string) {
  /**
   * You can specify components which you want to import from external/internal packages
   * in format:
   *  {
   *    name: 'package name',
   *    components: [
   *      {
   *        componentName: 'component name', // component rendering name,
   *        moduleName: 'module name' // component name to import from the package
   *      }
   *    ]
   *  }
   */
  const packages: PackageDefinition[] = [];
  const projects = getProjectList(projectRootPath);
  const components = getComponentList(componentRootPath);

  components.unshift(...packages);

  const fileContent = generateComponentFactoryCreator([...components, ...projects]);
  console.log(`Writing component factory creator to ${componentFactoryCreatorPath}`);
  fs.writeFileSync(componentFactoryCreatorPath, fileContent, {
    encoding: 'utf8',
  });

  if (!fs.existsSync('src/temp/projects')) {
    fs.mkdirSync('src/temp/projects');
  }

  projects.forEach((project) => {
    const indexFilePath = path.resolve(`src/temp/projects/${project.projectName}.ts`);

    console.log(`Writing project ${project.projectName} component source to ${indexFilePath}`);

    // Exclude `index.ts` file if exists
    const components = (getComponentList(project.componentsPath) as ComponentFile[]).filter(
      (c: ComponentFile) => !indexFilePath.includes(c.path)
    );

    const fileContent = generateProjectComponents(components, project.projectName);

    fs.writeFileSync(indexFilePath, fileContent, {
      encoding: 'utf8',
    });
  });
}

/**
 * Get components from a path in an app
 * @param {string} path
 */
function getComponentList(path: string): (PackageDefinition | ComponentFile)[] {
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
