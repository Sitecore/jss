
import * as fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { componentFactoryTemplate } from '../template';
import {
  ComponentFactoryPluginConfig,
  ComponentFactoryPlugin as ComponentFactoryPluginType,
} from '..';

export interface PackageDefinition {
  name: string;
  components: {
    moduleName: string;
    componentName: string;
  }[];
}

const componentFactoryPath = path.resolve('src/app/components/app-components.module.ts');
const componentRootPath = 'src/app/components';

function watchComponentFactory(config: ComponentFactoryPluginConfig) {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`);

  chokidar
    .watch(componentRootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', writeComponentFactory.bind(null, config))
    .on('unlink', writeComponentFactory.bind(null, config));
}

function writeComponentFactory(config: ComponentFactoryPluginConfig) {
  const componentFactory = generateComponentFactory(config);

  console.log(`Writing component factory to ${componentFactoryPath}`);

  fs.writeFileSync(componentFactoryPath, componentFactory, { encoding: 'utf8' });
}

function generateComponentFactory(config: ComponentFactoryPluginConfig) {
  // By convention, we expect to find Angular components
  // under /src/app/components/component-name/component-name.component.ts
  // If a component-name.module.ts file exists, we will treat it as lazy loaded.
  // If you'd like to use your own convention, encode it below.
  // NOTE: generating the component factory module is also totally optional,
  // and it can be maintained manually if preferred.

  const imports: string[] = [];
  const registrations: string[] = [];
  const lazyRegistrations: string[] = [];
  const declarations: string[] = [];

  config.packages.forEach((p) => {
    const variables = p.components
      .map((c) => {
        registrations.push(`{ name: '${c.componentName}', type: ${c.moduleName} },`);
        config.components.push(c.componentName);

        return c.moduleName;
      })
      .join(', ');
    imports.push(`import { ${variables} } from '${p.name}'`);
  });

  fs.readdirSync(componentRootPath).forEach((componentFolder) => {
    // ignore ts files in component root folder
    if (componentFolder.endsWith('.ts') || componentFolder === '.gitignore') {
      return;
    }

    const componentFilePath = path.join(
      componentRootPath,
      componentFolder,
      `${componentFolder}.component.ts`
    );

    if (!fs.existsSync(componentFilePath)) {
      return;
    }

    const componentFileContents = fs.readFileSync(componentFilePath, 'utf8');

    // ASSUMPTION: your component should export a class directly that follows Angular conventions,
    // i.e. `export class FooComponent` - so we can detect the component's name for auto registration.
    const componentClassMatch = /export class (.+?)Component\b/g.exec(componentFileContents);

    if (componentClassMatch === null) {
      console.debug(
        `Component ${componentFilePath} did not seem to export a component class. It will be skipped.`
      );
      return;
    }

    const componentName = componentClassMatch[1];
    const importVarName = `${componentName}Component`;

    config.components.push(componentName);

    // check for lazy loading needs
    const moduleFilePath = path.join(
      componentRootPath,
      componentFolder,
      `${componentFolder}.module.ts`
    );
    const isLazyLoaded = fs.existsSync(moduleFilePath);

    if (isLazyLoaded) {
      console.debug(`Registering JSS component (lazy) ${componentName}`);
      lazyRegistrations.push(
        `{ path: '${componentName}', loadChildren: () => import('./${componentFolder}/${componentFolder}.module').then(m => m.${componentName}Module) },`
      );
    } else {
      console.debug(`Registering JSS component ${componentName}`);
      imports.push(
        `import { ${importVarName} } from './${componentFolder}/${componentFolder}.component';`
      );
      registrations.push(`{ name: '${componentName}', type: ${importVarName} },`);
      declarations.push(`${importVarName},`);
    }
  });

  return componentFactoryTemplate({
    imports,
    components: config.components,
    registrations,
    lazyRegistrations,
    declarations,
  });
}

/**
 * Generates the component factory file.
 */
class ComponentFactoryPlugin implements ComponentFactoryPluginType {
  order = 9999;

  exec(config: ComponentFactoryPluginConfig) {
    if (config.watch) {
      watchComponentFactory(config);
    } else {
      writeComponentFactory(config);
    }

    return config;
  }
}

export const componentFactoryPlugin = new ComponentFactoryPlugin();
