import path from 'path';
import { Initializer, transform, BaseArgs } from '../../common';

export default class NodeHeadlessSsrExperienceEdgeInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(args: BaseArgs) {
    const templatePath = path.resolve(
      __dirname,
      '../../templates/node-headless-ssr-experience-edge'
    );
    await transform(templatePath, args);

    return {
      appName: 'node-headless-ssr-experience-edge',
    };
  }
}
