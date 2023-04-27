import { writeComponentFactoryCreator } from './../../generate-component-factory-creator';
import { BootstrapPlugin } from '../index';

/**
 * Generates the component factory creator file.
 */
class ComponentFactoryCreatorPlugin implements BootstrapPlugin {
  exec() {
    writeComponentFactoryCreator();
  }
}

export const componentFactoryCreatorPlugin = new ComponentFactoryCreatorPlugin();
