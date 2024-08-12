import path, { sep } from 'path';
import {
  ClientAppArgs,
  DEFAULT_APPNAME,
  Initializer,
  transform,
  openJsonFile,
  incompatibleAddonsMsg,
} from '../../common';
import { InitializerResults } from '../../common/Initializer';
import { ProxyArgs, proxyPrompts } from '../../common/prompts/proxy';
import inquirer from 'inquirer';
import { getRelativeProxyDestination } from '../../common/utils/helpers';

export default class AngularXmCloudInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openJsonFile(`${args.destination}${sep}package.json`);
    const addInitializers = [];
    // angular-xmcloud requires node-xmcloud-proxy
    if (!args.templates.includes('node-xmcloud-proxy')) {
      addInitializers.push('node-xmcloud-proxy');
    }

    // ensure args.proxyAppDestination is populated
    const promptArgs = {
      yes: args.yes,
      destination: args.destination,
      proxyName: 'node-xmcloud-proxy',
    };
    const proxyDetails = await inquirer.prompt<ProxyArgs>(proxyPrompts, promptArgs);
    args.proxyAppDestination = proxyDetails.proxyAppDestination;

    const finalArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
      ...proxyDetails,
      relativeProxyAppDestination: getRelativeProxyDestination(
        args.destination,
        args.proxyAppDestination || ''
      ),
    };

    const templatePath = path.resolve(__dirname, '../../templates/angular-xmcloud');
    await transform(templatePath, finalArgs);

    if (args.templates.includes('angular-sxp') || pkg.config?.templates?.includes('angular-sxp')) {
      console.log(incompatibleAddonsMsg('angular-xmcloud', 'angular-sxp'));
    }

    const response: InitializerResults = {
      nextSteps: [],
      appName: args.appName || DEFAULT_APPNAME,
      initializers: addInitializers,
    };

    return response;
  }
}
