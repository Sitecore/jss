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
import { getDefaultProxyDestination } from '../../common/utils/helpers';

export default class AngularXmCloudInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const pkg = openJsonFile(`${args.destination}${sep}package.json`);
    const addInitializers = [];
    // when installing proxy alongside main app, have a separate path ready
    if (!args.proxyAppDestination) {
      args.proxyAppDestination = getDefaultProxyDestination(args.destination, 'node-xmcloud-proxy');
    }

    if (!args.templates.includes('node-xmcloud-proxy')) {
      addInitializers.push('node-xmcloud-proxy');
    }
    const mergedArgs = {
      ...args,
      appName: args.appName || pkg?.config?.appName || DEFAULT_APPNAME,
      appPrefix: args.appPrefix || pkg?.config?.prefix || false,
    };

    const templatePath = path.resolve(__dirname, '../../templates/angular-xmcloud');

    await transform(templatePath, mergedArgs);

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
