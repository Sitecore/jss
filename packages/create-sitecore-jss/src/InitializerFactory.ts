import { Initializer } from './common/Initializer';
import {
  NextjsInitializer,
  NextjsStyleguideInitializer,
  NodeHeadlessSsrExperienceEdgeInitializer,
} from './initializers';

export class InitializerFactory {
  create(name: string): Initializer | undefined {
    switch (name) {
      case 'nextjs':
        return new NextjsInitializer();
      case 'nextjs-styleguide':
        return new NextjsStyleguideInitializer();
      case 'node-headless-ssr-experience-edge':
        return new NodeHeadlessSsrExperienceEdgeInitializer();
      default:
        return undefined;
    }
  }
}
