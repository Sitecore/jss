import fs from 'fs';
import path from 'path';
import { ComponentFile, PackageDefinition, Project } from 'scripts/templates/models';
import generateComponentFactoryCreator from './templates/component-factory-creator';
import { generateProjectComponents } from 'scripts/templates/project-components';
import { getItems, watchItems } from 'scripts/utils';

/*
  COMPONENT FACTORY CREATOR GENERATION
  Generates:
    * `/src/temp/componentFactoryCreator.ts` file, which provides creator to generate
      a componentFactory/moduleFactory based on custom configuration (e.g. editing mode)
    * `/src/temp/projects/<project>.ts` files, that provide components implemented for each project
      and used by componentFactoryCreator

  componentFactory maps JSS React components to Sitecore renderings, while moduleFactory maps component files.

  The component factory is a mapping between a string name and a React component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  Generating the componentFactoryCreator is optional, and it can be maintained manually if preferred.

  The default convention uses the component's filename (without the extension) as the component
  name. For example, the file `/components/ComponentName.ts` would map to component `ComponentName`.
  This can be customized in writeComponentFactoryCreator().

  This script supports two modes. In default mode, the component factory creator file is written once.
  In watch mode, the component factory creator source folder is watched, and componentFactoryCreator.ts is
  regenerated whenever files are added or deleted. Run in watch mode by passing a `--watch` argument
  when calling the script.
*/

const componentFactoryCreatorPath = path.resolve('src/temp/componentFactoryCreator.ts');
const componentRootPath = 'src/components';
export const projectRootPath = 'src/projects';

const isWatch = process.argv.some(arg => arg === '--watch');

isWatch && watchComponentFactoryCreator();

/**
 * Watches component directory for changes. When files are added or deleted, the component factory creator
 * file (componentFactoryCreator.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchComponentFactoryCreator() {
  console.log(
    `Watching for changes to component factory creator sources in ${componentRootPath}...`
  );

  const projects = getProjectList(projectRootPath);

  const projectComponentsPaths = projects.map(project => {
    console.log(
      `Watching for changes to component factory creator sources in ${project.componentsPath}...`
    );

    return project.componentsPath;
  });

  watchItems([componentRootPath, ...projectComponentsPaths], writeComponentFactoryCreator);
}

/**
 * Generates the component factory creator file and saves it to the filesystem.
 * By convention, we expect to find: 
 *   * React components under src/components/** 
 *   * Project components under src/projects/<project>/components/**
 * (subfolders are searched recursively). 
 * The filename, with the extension stripped, is used for the component's
 * string name (for mapping to Sitecore). The filename, with extension and non-word characters
 * stripped, is used to identify the component's JavaScript module definition (for initializing
 * new component instances in code).
 * Modify this function to use a different convention.
 */
export function writeComponentFactoryCreator() {
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

  projects.forEach(project => {
    const indexFilePath = path.resolve(`src/temp/projects/${project.projectName}.ts`);

    console.log(`Writing project ${project.projectName} component source to ${indexFilePath}`);

    // Exclude `index.ts` file if exists
    const components = getComponentList(project.componentsPath).filter(
      (c: ComponentFile) => !indexFilePath.includes(c.path)
    ) as ComponentFile[];

    const fileContent = generateProjectComponents(components, project.projectName);

    fs.writeFileSync(indexFilePath, fileContent, {
      encoding: 'utf8',
    });
  });
}

function getComponentList(path: string): (PackageDefinition | ComponentFile)[] {
  const components = getItems<PackageDefinition | ComponentFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      componentName: name,
      moduleName: name.replace(/[^\w]+/g, ''),
    }),
    cb: name => console.debug(`Registering JSS component ${name}`),
  });

  return components;
}

export function getProjectList(path: string): Project[] {
  const projects = getItems<Project>({
    path,
    resolveItem: (path, name) => ({
      projectName: name,
      componentsPath: `${path}/components`,
    }),
    cb: name => console.debug(`Registering JSS project ${name}`),
    recursive: false,
  });

  return projects;
}
