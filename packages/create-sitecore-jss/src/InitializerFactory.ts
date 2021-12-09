import { Initializer } from './common/Initializer';
import { NextjsInitializer, NextjsStyleguideInitializer, ReactInitializer } from './initializers';

export class InitializerFactory {
  create(name: string): Initializer | undefined {
    switch (name) {
      case 'nextjs':
        return new NextjsInitializer();
      case 'nextjs-styleguide':
        return new NextjsStyleguideInitializer();
      case 'react':
        return new ReactInitializer();
      default:
        return undefined;
    }
  }
}
