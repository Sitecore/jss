/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector, validateName } from '@schematics/angular/utility/validation';
import chalk from 'chalk';
import { Schema as ComponentOptions } from './schema';

function buildSelector(options: ComponentOptions, projectPrefix: string) {
  let selector = strings.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  } else if (options.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${selector}`;
  }

  return selector;
}

export default function(options: ComponentOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      throw new SchematicsException('Option (project) is required.');
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
      const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
      options.path = `/${project.root}/src/${projectDirName}`;
    }

    if (options.manifestPath === undefined) {
      options.manifestPath = '/sitecore/definitions/components';
    }

    // JSS: if no subfolder is specified in the component name, we imply our
    // default convention of '/components/' for JSS components.
    if (options.name.indexOf('/') < 0) {
      options.name = `components/${options.name}`;
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector = options.selector || buildSelector(options, project.prefix);

    validateName(options.name);
    validateHtmlSelector(options.selector);

    const sources: Rule[] = [];

    if (!options.noManifest) {
      const manifestTemplateSource = apply(url('./manifest-files'), [
        template({
          ...strings,
          ...options,
        }),
        move(parseName(options.manifestPath, '').path),
      ]);

      sources.push(mergeWith(manifestTemplateSource));
    }

    const templateSource = apply(url('./component-files'), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      options.inlineStyle ? filter((path) => !path.endsWith('.__styleext__')) : noop(),
      options.inlineTemplate ? filter((path) => !path.endsWith('.html')) : noop(),
      options.lazyload ? noop() : filter((path) => !path.endsWith('.module.ts')),
      template({
        ...strings,
        'if-flat': (s: string) => options.flat ? '' : s,
        ...options,
      }),
      move(parsedPath.path),
    ]);

    sources.push(mergeWith(templateSource));

    console.log();
    console.log(chalk.green(`Component ${options.name} is scaffolding.`));
    console.log(chalk.green('Next steps:'));
    if (!options.noManifest) {
      console.log(`* Define the component's data in ${chalk.green(`${options.manifestPath}/${options.name}.sitecore.ts`)}`);
    } else {
      console.log(
        `* Scaffold the component in Sitecore using '${chalk.green(
          `jss deploy component ${options.name} --allowedPlaceholders placeholder-for-component`
        )}, or create the rendering item and datasource template yourself.`
      );
    }
    console.log(`* Implement the Angular component in ${chalk.green(`${parsedPath.path}/${parsedPath.name}`)}`);
    if (!options.noManifest) {
      console.log(`* Add the component to a route layout (/data/routes) and test it with ${chalk.green('jss start')}`);
    } else {
      console.log(
        `* Deploy your app with the new component to Sitecore (${chalk.green(
          'jss deploy:watch'
        )} or ${chalk.green('jss deploy files')})`
      );
      console.log(`* Add the component to a route using Sitecore Experience Editor, and test it.`);
    }

    console.log();

    return branchAndMerge(chain(sources))(host, context);
  };
}
