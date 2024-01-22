import { ComponentType } from 'react';
import { ComponentFactory } from './components/sharedTypes';

/**
 * Configuration for ComponentBuilder
 */
export type ComponentBuilderConfig<ComponentType> = {
  /**
   * List of components to be stored
   */
  components: Map<string, ComponentType>;
};

/**
 * React implementation of component builder class for building components based on the configuration.
 */
export class ComponentBuilder {
  /**
   * List of components to be stored
   */
  protected components: Map<string, ComponentType>;

  constructor(protected config: ComponentBuilderConfig<ComponentType>) {
    this.components = new Map([...config.components]);
  }

  /**
   * Creates a new instance of component factory
   * @returns {ComponentFactory} Component factory implementation
   */
  getComponentFactory(): ComponentFactory {
    return (componentName: string) => {
      const component = this.components.get(componentName);

      if (!component) return null;

      return component;
    };
  }
}
