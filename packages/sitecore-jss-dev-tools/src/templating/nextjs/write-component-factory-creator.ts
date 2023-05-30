import fs from 'fs';
import path from 'path';
import { ComponentFile, PackageDefinition, Project } from '../types';
import { generateComponentFactoryCreator } from './templates/component-factory-creator';
import { generateProjectComponents } from './templates/project-components';
import { getComponentList, getProjectList } from './component-factory-utils';
import { componentFactoryOutputPath, projectsOutputPath } from './constants';

/**
 * Generates the component factory creator file and saves it to the filesystem.
 * By convention, we expect to find:
 * * React components under src/components/**
 * * Project components under src/projects/<project>/components/**
 * (subfolders are searched recursively).
 * The filename, with the extension stripped, is used for the component's
 * string name (for mapping to Sitecore).
 * The filename, with extension and non-word characters stripped, is used to identify the 
 * component's JavaScript module definition (for initializing new component instances in code).
 * Modify this function to use a different convention.
 * @param {string} componentRootPath - path to get components from
 * @param {string} projectRootPath - path to the projects
 * @param {PackageDefinition[]} customPackages - extra component definitions added from code
 */
export function writeComponentFactoryCreator(
  componentRootPath: string,
  projectRootPath: string,
  customPackages?: PackageDefinition[]
) {
  const packages: PackageDefinition[] = customPackages || [];
  const projects = getProjectList(projectRootPath);
  const components = getComponentList(componentRootPath);

  components.unshift(...packages);

  writeComponentFactory(components, projects);

  if (!fs.existsSync(projectsOutputPath)) {
    fs.mkdirSync(projectsOutputPath);
  }

  projects.forEach((project) => {
    writeProjectComponents(project);
  });
}

/**
 * writes component factory to file
 * @param {(PackageDefinition | ComponentFile)[]} components list of components to register
 * @param {Project[]} projects list of projects to reference
 */
export function writeComponentFactory(
  components: (PackageDefinition | ComponentFile)[],
  projects: Project[]
) {
  const componentFactoryCreatorPath = path.resolve(componentFactoryOutputPath);
  const fileContent = generateComponentFactoryCreator([...components, ...projects]);
  console.log(`Writing component factory creator to ${componentFactoryCreatorPath}`);
  fs.writeFileSync(componentFactoryCreatorPath, fileContent, {
    encoding: 'utf8',
  });
}

/**
 * writes component project components into file
 * @param {Project} project project definition to generate file for
 */
export function writeProjectComponents(project: Project) {
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
}
