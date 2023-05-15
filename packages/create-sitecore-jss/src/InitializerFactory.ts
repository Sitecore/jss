import path from 'path';
import { Initializer } from './common';

export class InitializerFactory {
  async create(name: string): Promise<Initializer | undefined> {
    try {
      const { default: Initializer } = await import(
        path.resolve(__dirname, 'initializers', name, 'index')
      );
      return new Initializer();
    } catch (error) {
      return undefined;
    }
  }
}
