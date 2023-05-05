import { writeComponentFactoryCreator } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import { BoostrapConfig, BootstrapPlugin } from '../index';

/**
 * Generates the component factory creator file.
 */
class ComponentFactoryCreatorPlugin implements BootstrapPlugin {
  exec(bootConfig: BoostrapConfig) {
    writeComponentFactoryCreator(bootConfig.componentRootPath, bootConfig.projectRootPath);
  }
}

export const componentFactoryCreatorPlugin = new ComponentFactoryCreatorPlugin();
