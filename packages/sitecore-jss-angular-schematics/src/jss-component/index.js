"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@schematics/angular/utility/workspace");
const workspace_models_1 = require("@schematics/angular/utility/workspace-models");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const validation_1 = require("@schematics/angular/utility/validation");
const chalk_1 = require("chalk");
function buildSelector(options, projectPrefix) {
    let selector = core_1.strings.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    else if (options.prefix === undefined && projectPrefix) {
        selector = `${projectPrefix}-${selector}`;
    }
    return selector;
}
function default_1(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        if (!options.project) {
            throw new schematics_1.SchematicsException('Option (project) is required.');
        }
        const project = workspace.projects.get(options.project);
        if (options.path === undefined) {
            const projectDirName = (project === null || project === void 0 ? void 0 : project.extensions.projectType) === workspace_models_1.ProjectType.Application ? 'app' : 'lib';
            options.path = `/${project === null || project === void 0 ? void 0 : project.root}/src/${projectDirName}`;
        }
        // this is not an options option due to schematics issues with multiple template roots
        const manifestPath = '/sitecore/definitions/components';
        // JSS: if no subfolder is specified in the component name, we imply our
        // default convention of '/components/' for JSS components.
        if (options.name.indexOf('/') < 0) {
            options.name = `components/${options.name}`;
        }
        const parsedPath = parse_name_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        options.selector = options.selector || buildSelector(options, project === null || project === void 0 ? void 0 : project.prefix);
        validation_1.validateName(options.name);
        validation_1.validateHtmlSelector(options.selector);
        const sources = [];
        if (!options.noManifest) {
            const manifestTemplateSource = schematics_1.apply(schematics_1.url('./manifest-files'), [
                schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
                // having two calls to move() - one here and one in templateSource - causes an infinite loop error
                // ('call stack size exceeded'). So as a workaround, the manifest template contains the
                // manifest path folder structure within it. This means options.manifestPath is basically ignored.
                // The move() call should re-base the template to a different folder root, but it seems to be buggy.
                // move(parseName(options.manifestPath, '').path),
            ]);
            sources.push(schematics_1.mergeWith(manifestTemplateSource));
        }
        const templateSource = schematics_1.apply(schematics_1.url('./component-files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter((path) => !path.endsWith('.spec.ts')),
            options.inlineStyle ? schematics_1.filter((path) => !path.endsWith('.__styleext__')) : schematics_1.noop(),
            options.inlineTemplate ? schematics_1.filter((path) => !path.endsWith('.html')) : schematics_1.noop(),
            options.lazyload ? schematics_1.noop() : schematics_1.filter((path) => !path.endsWith('.module.ts')),
            schematics_1.template(Object.assign(Object.assign(Object.assign({}, core_1.strings), { 'if-flat': (s) => (options.flat ? '' : s) }), options)),
            schematics_1.move(parsedPath.path),
        ]);
        sources.push(schematics_1.mergeWith(templateSource));
        console.log();
        console.log(chalk_1.default.green(`Component ${options.name} is scaffolding.`));
        console.log(chalk_1.default.green('Next steps:'));
        if (!options.noManifest) {
            console.log(`* Define the component's data in ${chalk_1.default.green(`${manifestPath}/${options.name}.sitecore.ts`)}`);
        }
        else {
            console.log(`* Scaffold the component in Sitecore using '${chalk_1.default.green(`jss deploy component ${options.name} --allowedPlaceholders placeholder-for-component`)}, or create the rendering item and datasource template yourself.`);
        }
        console.log(`* Implement the Angular component in ${chalk_1.default.green(`${parsedPath.path}/${parsedPath.name}`)}`);
        if (!options.noManifest) {
            console.log(`* Add the component to a route layout (/data/routes) and test it with ${chalk_1.default.green('jss start')}`);
        }
        else {
            console.log(`* Deploy your app with the new component to Sitecore (${chalk_1.default.green('jss deploy:watch')} or ${chalk_1.default.green('jss deploy files')})`);
            console.log('* Add the component to a route using Sitecore Experience Editor, and test it.');
        }
        console.log();
        return schematics_1.branchAndMerge(schematics_1.chain(sources));
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map