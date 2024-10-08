import * as fs from 'fs';
const path = require('path');
const chokidar = require('chokidar');

/*
  COMPONENT FACTORY GENERATION
  Generates the /src/app/components/app-components.module.ts file which maps Angular components
  to JSS components.

  The component factory module defines a mapping between a string component name and a Angular component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  NOTE: this script can run in two modes. The default mode, the component factory file is written once.
  But if `--watch` is a process argument, the component factory source folder will be watched,
  and the componentFactory.js rewritten on added or deleted files.
  This is used during `jss start` to pick up new or removed components at runtime.
*/

export interface PackageDefinition {
  name: string;
  components: {
    moduleName: string;
    componentName: string;
  }[];
}

const componentFactoryPath = path.resolve('src/app/components/app-components.module.ts');
const componentRootPath = 'src/app/components';

const isWatch = process.argv.some((arg) => arg === '--watch');

if (isWatch) {
  watchComponentFactory();
} else {
  writeComponentFactory();
}

function watchComponentFactory() {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`);

  chokidar
    .watch(componentRootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', writeComponentFactory)
    .on('unlink', writeComponentFactory);
}

function writeComponentFactory() {
  const componentFactory = generateComponentFactory();

  console.log(`Writing component factory to ${componentFactoryPath}`);

  fs.writeFileSync(componentFactoryPath, componentFactory, { encoding: 'utf8' });
}

function generateComponentFactory() {
  // By convention, we expect to find Angular components
  // under /src/app/components/component-name/component-name.component.ts
  // If a component-name.module.ts file exists, we will treat it as lazy loaded.
  // If you'd like to use your own convention, encode it below.
  // NOTE: generating the component factory module is also totally optional,
  // and it can be maintained manually if preferred.

  const imports: string[] = [];
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
  const registrations: string[] = [];
  const lazyRegistrations: string[] = [];
  const declarations: string[] = [];
  const components: string[] = [];

  packages.forEach((p) => {
    const variables = p.components
      .map((c) => {
        registrations.push(`{ name: '${c.componentName}', type: ${c.moduleName} },`);
        declarations.push(`${c.moduleName},`);
        components.push(c.componentName);

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

    const componentFilePath = path.join(componentRootPath, componentFolder, `${componentFolder}.component.ts`);

    if (!fs.existsSync(componentFilePath)) {
      return;
    }

    const componentFileContents = fs.readFileSync(componentFilePath, 'utf8');

    // ASSUMPTION: your component should export a class directly that follows Angular conventions,
    // i.e. `export class FooComponent` - so we can detect the component's name for auto registration.
    const componentClassMatch = /export class (.+?)Component\b/g.exec(componentFileContents);

    if (componentClassMatch === null) {
      console.debug(`Component ${componentFilePath} did not seem to export a component class. It will be skipped.`);
      return;
    }

    const componentName = componentClassMatch[1];
    const importVarName = `${componentName}Component`;

    components.push(componentName);

    // check for lazy loading needs
    const moduleFilePath = path.join(componentRootPath, componentFolder, `${componentFolder}.module.ts`);
    const isLazyLoaded = fs.existsSync(moduleFilePath);

    if (isLazyLoaded) {
      console.debug(`Registering JSS component (lazy) ${componentName}`);
      lazyRegistrations.push(`{ path: '${componentName}', loadChildren: () => import('./${componentFolder}/${componentFolder}.module').then(m => m.${componentName}Module) },`);
    } else {
      console.debug(`Registering JSS component ${componentName}`);
      imports.push(`import { ${importVarName} } from './${componentFolder}/${componentFolder}.component';`);
      registrations.push(`{ name: '${componentName}', type: ${importVarName} },`);
      declarations.push(`${importVarName},`);
    }
  });

  return `// Do not edit this file, it is auto-generated at build time!
// See scripts/generate-component-factory.js to modify the generation of this file.
// Use app-components.shared.module.ts to modify the imports, etc of this module.
// Note: code-generation is optional! See ./.gitignore for directions to remove it,
// if you do not want it.

import { NgModule } from '@angular/core';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { AppComponentsSharedModule } from './app-components.shared.module';
${imports.join('\n')}

export const components = [
  ${components.map((c) => `'${c}'`).join(',\n  ')}
];

@NgModule({
  imports: [
    AppComponentsSharedModule,
    JssModule.withComponents([
      ${registrations.join('\n      ')}
    ], [
      ${lazyRegistrations.join('\n      ')}
    ]),
  ],
  exports: [
    JssModule,
    AppComponentsSharedModule,
  ],
  declarations: [
    ${declarations.join('\n    ')}
  ],
})
export class AppComponentsModule { }
`;
}
