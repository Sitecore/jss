import { ComponentFactory } from '@sitecore-jss/sitecore-jss-react';
import { Module, ModuleFactory, LazyModule } from './sharedTypes/component-module';

/**
 * Component is a module or a lazy module
 */
type Component = Module | LazyModule;

/**
 * Configuration for ComponentBuilder
 */
export type ComponentBuilderConfig<Component> = {
  /**
   * List of components to be stored
   */
  components: Map<string, Component>;
};

/**
 * Configuration for ComponentFactory
 */
type ComponentFactoryConfig = {
  isEditing?: boolean;
};

/**
 * Nextjs implementation of component builder class for building components based on the configuration.
 */
export class ComponentBuilder {
  /**
   * List of components to be stored
   */
  protected components: Map<string, Component>;

  /**
   * SXA uses custom default export name
   */
  protected DEFAULT_EXPORT_NAME = 'Default';

  constructor(protected config: ComponentBuilderConfig<Component>) {
    this.components = new Map([...config.components]);
  }

  /**
   * Creates a new instance of module factory
   * Module factory provides a module (file) including all exports.
   * Module can be imported dynamically or statically.
   * @returns {ModuleFactory} Module factory implementation
   */
  getModuleFactory(): ModuleFactory {
    return (componentName: string) => {
      const component = this.components.get(componentName);

      if (!component) return null;

      // check if module should be imported dynamically
      if ((component as LazyModule).module) {
        return (component as LazyModule).module();
      }

      return component as Module;
    };
  }

  /**
   * Creates a new instance of component factory
   * Component factory provides a component imported dynamically or statically.
   * @param {Object} config Component factory configuration
   * @param {boolean} config.isEditing Indicates if component factory is used in editing mode
   * @returns {ComponentFactory} Component factory implementation
   */
  getComponentFactory({ isEditing }: ComponentFactoryConfig): ComponentFactory {
    return (componentName: string, exportName?: string) => {
      const component = this.components.get(componentName);

      if (!component) return null;

      // check if component should be imported dynamically
      if ((component as LazyModule).element) {
        // Editing mode doesn't work well with dynamic components in nextjs: dynamic components are not displayed without refresh after a rendering is added.
        // This happens beacuse Sitecore editors simply insert updated HTML generated on server side. This conflicts with nextjs dynamic logic as no HTML gets rendered for dynamic component
        // So we use require() to obtain dynamic components in editing mode while preserving dynamic logic for non-editing scenarios
        // As we need to be able to seamlessly work with dynamic components in both editing and normal modes, different componentFactory functions will be passed to app
        return (component as LazyModule).element(isEditing);
      }

      if (exportName && exportName !== this.DEFAULT_EXPORT_NAME) {
        return (component as Module)[exportName];
      }

      return (component as Module).Default || (component as Module).default || null;
    };
  }
}
