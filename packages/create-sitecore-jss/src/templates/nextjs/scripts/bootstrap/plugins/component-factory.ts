import { writeComponentFactory } from './../../generate-component-factory';
import { BootstrapPlugin } from '../index';

class ComponentFactoryPlugin implements BootstrapPlugin {
  exec() {
    writeComponentFactory();
  }
}

export const componentFactoryPlugin = new ComponentFactoryPlugin();
