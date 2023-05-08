import { writeComponentFactoryCreator, constants } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import { BootstrapPlugin } from '../index';

/**
 * Generates the component factory creator file.
 */
class ComponentFactoryCreatorPlugin implements BootstrapPlugin {
  exec() {
    writeComponentFactoryCreator(constants.COMPONENT_ROOT_PATH, constants.PROJECT_ROOT_PATH);
  }
}

export const componentFactoryCreatorPlugin = new ComponentFactoryCreatorPlugin();
