import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import generateComponentFactory, {
  ComponentFile,
  PackageDefinition,
} from './templates/component-factory';

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

/* eslint-disable no-console */

const componentFactoryPath = path.resolve('src/temp/componentFactory.ts');
const componentRootPath = 'src/components';

// Matches TypeScript files that are not type definition files
const fileFormat = new RegExp(/(.+)(?<!\.d)\.tsx?$/);

const isWatch = process.argv.some((arg) => arg === '--watch');
(isWatch ? watchComponentFactory : writeComponentFactory)();

/**
 * Watches component directory for changes. When files are added or deleted, the component factory
 * file (componentFactory.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchComponentFactory() {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`);

  chokidar
    .watch(componentRootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', writeComponentFactory)
    .on('unlink', writeComponentFactory);
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
  const packageComponents: PackageDefinition[] = [
    {
      name: '@sitecore-jss/sitecore-jss-nextjs',
      components: [
        {
          componentName: 'Hidden Rendering',
          moduleName: 'HiddenRendering',
        },
      ],
    },
  ];
  const components = getComponentList(componentRootPath);

  components.unshift(...packageComponents);

  const fileContent = generateComponentFactory(components);
  console.log(`Writing component factory to ${componentFactoryPath}`);
  fs.writeFileSync(componentFactoryPath, fileContent, {
    encoding: 'utf8',
  });
}

function getComponentList(path: string): (PackageDefinition | ComponentFile)[] {
  const components: (PackageDefinition | ComponentFile)[] = [];
  const folders: fs.Dirent[] = [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      folders.push(item);
    }

    if (fileFormat.test(item.name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = item.name.match(fileFormat)![1];
      console.debug(`Registering JSS component ${name}`);
      components.push({
        path: `${path}/${name}`,
        componentName: name,
        moduleName: name.replace(/[^\w]+/g, ''),
      });
    }
  });

  for (const folder of folders) {
    components.push(...getComponentList(`${path}/${folder.name}`));
  }

  return components;
}
