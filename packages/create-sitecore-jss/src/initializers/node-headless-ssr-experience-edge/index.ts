import path from 'path';
import { Initializer } from '../../common/Initializer';
import { transform } from '../../common/steps/index';
import { BaseArgs } from '../../common/args/base';

export class NodeHeadlessSsrExperienceEdgeInitializer implements Initializer {
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
