import { writeComponentFactory } from './../../generate-component-factory';
import { BootstrapPlugin } from '../index';

/**
 * Generates the component factory file.
 */
class ComponentFactoryPlugin implements BootstrapPlugin {
  exec() {
    writeComponentFactory();
  }
}

export const componentFactoryPlugin = new ComponentFactoryPlugin();
