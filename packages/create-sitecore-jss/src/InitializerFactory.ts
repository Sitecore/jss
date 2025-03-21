import path from 'path';
import { Initializer } from './common';

export class InitializerFactory {
  /**
   * @param {string} [rootPath] Root path where 'initializers' folder resides. Default is __dirname.
   */
  constructor(protected rootPath: string = __dirname) {}

  async create(name: string): Promise<Initializer | undefined> {
    try {
      const { default: Initializer } = await import(
        path.resolve(this.rootPath, 'initializers', name, 'index')
      );
      return new Initializer();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return undefined;
    }
  }
}
