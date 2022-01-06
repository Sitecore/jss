import path from 'path';
import { Initializer, transform, BaseArgs } from '../../common';

export default class NodeHeadlessSsrProxyInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: BaseArgs) {
    const templatePath = path.resolve(__dirname, '../../templates/node-headless-ssr-proxy');
    await transform(templatePath, args);

    return {
      appName: 'node-headless-ssr-proxy',
    };
  }
}
