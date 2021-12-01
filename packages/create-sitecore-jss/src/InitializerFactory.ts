import { Initializer } from './common/Initializer';
import { NextjsInitializer, NextjsStyleguideInitializer } from './initializers';

export class InitializerFactory {
  create(name: string): Initializer | undefined {
    switch (name) {
      case 'nextjs':
        return new NextjsInitializer();
      case 'nextjs-styleguide':
        return new NextjsStyleguideInitializer();
      default:
        return undefined;
    }
  }
}
