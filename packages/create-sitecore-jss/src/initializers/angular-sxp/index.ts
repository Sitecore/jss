import { ClientAppArgs, DEFAULT_APPNAME, Initializer } from '../../common';
import { InitializerResults } from '../../common/Initializer';

export default class AngularXmCloudInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init(args: ClientAppArgs) {
    const response: InitializerResults = {
      nextSteps: [],
      appName: args.appName || DEFAULT_APPNAME,
    };

    return response;
  }
}
