import { getProjectList, writeComponentFactoryCreator, constants } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import { watchItems } from '@sitecore-jss/sitecore-jss-dev-tools';

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
*/ 
/*
  This script supports utilizes factory creator in watch mode.
  In watch mode, the component factory creator source folder is watched, and componentFactoryCreator.ts is
  regenerated whenever files are added or deleted.

  For manual component factory generation run bootstrap
*/

watchComponentFactoryCreator();

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
    `Watching for changes to component factory creator sources in ${constants.COMPONENT_ROOT_PATH}...`
  );

  const projects = getProjectList(constants.PROJECT_ROOT_PATH);

  const projectComponentsPaths = projects.map(project => {
    console.log(
      `Watching for changes to component factory creator sources in ${project.componentsPath}...`
    );

    return project.componentsPath;
  });

  const componentFactoryCreatorWrapper = () => 
  {
    writeComponentFactoryCreator(constants.COMPONENT_ROOT_PATH, constants.PROJECT_ROOT_PATH);
  }
  watchItems([constants.COMPONENT_ROOT_PATH, ...projectComponentsPaths], componentFactoryCreatorWrapper);
}
