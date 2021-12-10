import path from 'path';
import chalk from 'chalk';
import { Initializer } from './common/Initializer';

export class InitializerFactory {
  async create(name: string): Promise<Initializer> {
    try {
      const { default: Initializer } = await import(
        path.resolve(__dirname, 'initializers', name, 'index')
      );
      return new Initializer();
    } catch (error) {
      console.error(chalk.red(`Unsupported template '${name}'`));
      throw error;
    }
  }
}
