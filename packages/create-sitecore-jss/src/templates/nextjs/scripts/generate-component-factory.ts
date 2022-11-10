import fs from 'fs';
import path from 'path';
import generateComponentFactory, {
  ComponentFile,
  PackageDefinition,
} from './templates/component-factory';
import { getItems, watchItems } from './utils';

/*
  COMPONENT FACTORY GENERATION
  Generates the `/src/temp/componentFactory.ts` file, which maps JSS React components
  to Sitecore renderings.

  The component factory is a mapping between a string name and a React component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  Generating the componentFactory is optional, and it can be maintained manually if preferred.

  The default convention uses the component's filename (without the extension) as the component
  name. For example, the file `/components/ComponentName.ts` would map to component `ComponentName`.
  This can be customized in writeComponentFactory().

  This script supports two modes. In default mode, the component factory file is written once.
  In watch mode, the component factory source folder is watched, and componentFactory.ts is
  regenerated whenever files are added or deleted. Run in watch mode by passing a `--watch` argument
  when calling the script.
*/

// eslint-disable-next-line prettier/prettier
const getDirectories = (srcPath: string) => fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

const componentFactoryPath = path.resolve('src/temp/componentFactory.ts');
const componentRootPath = 'src/components';
const componentRootPaths = {
  shared: componentRootPath + '/shared',
  themes: getDirectories(componentRootPath + '/themes'),
  sites: getDirectories(componentRootPath + '/sites'),
};

// Match any files. Adjust this to exclude files from being included.
const fileFormat = new RegExp(/^(.+)\.tsx$/);

const isWatch = process.argv.some((arg) => arg === '--watch');

(isWatch ? watchComponentFactory : writeComponentFactory)();

/**
 * Watches component directory for changes. When files are added or deleted, the component factory
 * file (componentFactory.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchComponentFactory() {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`);

  watchItems(componentRootPath, writeComponentFactory);
}

/**
 * Generates the component factory file and saves it to the filesystem.
 * By convention, we expect to find React components under src/components/** (subfolders are
 * searched recursively). The filename, with the extension stripped, is used for the component's
 * string name (for mapping to Sitecore). The filename, with extension and non-word characters
 * stripped, is used to identify the component's JavaScript module definition (for initializing
 * new component instances in code).
 * Modify this function to use a different convention.
 */
function writeComponentFactory() {
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
  const components: (ComponentFile | PackageDefinition)[] = [];

  for (const site of componentRootPaths.sites) {
    const siteComponents = getComponentList(componentRootPath + '/sites/' + site, `SITE_${site}_`);
    components.unshift(...siteComponents);
  }

  for (const theme of componentRootPaths.themes) {
    // eslint-disable-next-line prettier/prettier
    const themeComponents = getComponentList(componentRootPath + '/themes/' + theme, `THEME_${theme}_`);
    components.unshift(...themeComponents);
  }

  const sharedComponents = getComponentList(componentRootPaths.shared, 'SHARED_');
  components.unshift(...sharedComponents);

  components.unshift(...packages);

  const fileContent = generateComponentFactory(components);
  console.log(`Writing component factory to ${componentFactoryPath}`);
  fs.writeFileSync(componentFactoryPath, fileContent, {
    encoding: 'utf8',
  });
}

function getComponentList(path: string, prefix: string): (PackageDefinition | ComponentFile)[] {
  const components = getItems<PackageDefinition | ComponentFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      componentName: prefix + name,
      moduleName: prefix + name.replace(/[^\w]+/g, ''),
    }),
    cb: (name) => console.debug(`Registering JSS component ${name}`),
    fileFormat: fileFormat,
  });

  return components;
}
