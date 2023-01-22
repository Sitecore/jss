// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('scripts/temp/bootstrap-plugins');

export interface BootstrapPlugin {
  /**
   * A function which will be called during bootstrap execution
   */
  exec(): void;
}

export class JssBootstrapFactory {
  public async create(): Promise<void> {
    return (Object.values(plugins) as BootstrapPlugin[]).forEach((plugin) => plugin.exec());
  }
}

export const jssBootstrapFactory = new JssBootstrapFactory();
