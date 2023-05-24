import { startComponentFactoryCreator } from 'scripts/component-factory/startComponentFactoryCreator';
import { BootstrapPlugin } from '../index';

/**
 * Generates the component factory creator file.
 */
class ComponentFactoryCreatorPlugin implements BootstrapPlugin {
  exec() {
    startComponentFactoryCreator();
  }
}

export const componentFactoryCreatorPlugin = new ComponentFactoryCreatorPlugin();
