import { getProjectList, writeComponentFactoryCreator } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs'
import config from 'temp/config';
import chokidar from 'chokidar';


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


const isWatch = process.argv.some(arg => arg === '--watch');

isWatch ? watchComponentFactoryCreator(): writeComponentFactoryCreator(config.componentRootPath, config.projectRootPath);

/**
 * You can specify components which you want to import from external/internal packages
 * in format:
 * let customPackages = [{
 *    name: 'package name',
 *    components: [
 *      {
 *        componentName: 'component name', // component rendering name,
 *        moduleName: 'module name' // component name to import from the package
 *      }
 *    ]
 *  },
 *  {... extra packages..}]
 * and pass them into writeComponentFactoryCreator
 * writeComponentFactoryCreator(config.componentRootPath, config.projectRootPath, customPackages)
 */

/**
 * Watches component directory for changes. When files are added or deleted, the component factory creator
 * file (componentFactoryCreator.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchComponentFactoryCreator() {
  console.log(
    `Watching for changes to component factory creator sources in ${config.projectRootPath}...`
  );

  const projects = getProjectList(config.projectRootPath);

  const projectComponentsPaths = projects.map(project => {
    console.log(
      `Watching for changes to component factory creator sources in ${project.componentsPath}...`
    );

    return project.componentsPath;
  });

  const componentFactoryCreatorWrapper = () => 
  {
    writeComponentFactoryCreator(config.componentRootPath, config.projectRootPath);
  }
 
  watchItems([config.componentRootPath, ...projectComponentsPaths], componentFactoryCreatorWrapper);
}

/**
 * Run watch mode, watching on @var paths
 */
function watchItems(paths: string[], componentFactoryCallback: () => void): void {
    chokidar
      .watch(paths, { ignoreInitial: true, awaitWriteFinish: true })
      .on('add', componentFactoryCallback)
      .on('unlink', componentFactoryCallback);
}
