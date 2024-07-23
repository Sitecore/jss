import { Initializer } from '../../common';

export default class AngularXmCloudInitializer implements Initializer {
  get isBase(): boolean {
    return false;
  }

  async init() {
    const response = {
      appName: 'node-xmcloud-proxy',
    };

    return response;
  }
}
