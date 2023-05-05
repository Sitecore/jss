// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('scripts/temp/bootstrap-plugins');

export interface BoostrapConfig {
  componentRootPath: string;
  projectRootPath: string;
}

export interface BootstrapPlugin {
  /**
   * A function which will be called during bootstrap execution
   */
  exec(bootConfig: BoostrapConfig): void;
}

export class JssBootstrapFactory {
  public async create(): Promise<void> {
    const bootConfig = {
      componentRootPath: 'src/components',
      projectRootPath: 'src/projects',
    }
    return (Object.values(plugins) as BootstrapPlugin[]).forEach((plugin) => plugin.exec(bootConfig));
  }
}

export const jssBootstrapFactory = new JssBootstrapFactory();
