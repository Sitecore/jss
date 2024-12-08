import path from 'path';
import { Initializer, transform, BaseArgs } from '../../common';

export default class AngularXmCloudInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: BaseArgs) {
    const templatePath = path.resolve(__dirname, '../../templates/node-xmcloud-proxy');
    const modifiedArgs = {
      ...args,
      destination: args.proxyAppDestination || args.destination,
    };
    await transform(templatePath, modifiedArgs);
    const response = {
      appName: 'node-xmcloud-proxy',
    };

    return response;
  }
}
