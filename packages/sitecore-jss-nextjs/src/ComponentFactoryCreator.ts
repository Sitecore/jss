import { ComponentFactory } from '@sitecore-jss/sitecore-jss-react';
import {
  Module,
  LazyModule,
  ComponentModule as ModuleFactory,
} from './sharedTypes/component-module';

/**
 * With multi-project setups we use a config for a factory that can return both default and project components
 */
type FactoryCreatorConfig = {
  components: Map<string, ComponentType>;
  projectComponents?: Map<string, { [key: string]: ComponentType }>;
};

type ComponentFactoryConfig = { projectName?: string; isEditing?: boolean };

type ModuleFactoryConfig = { projectName?: string };

/**
 * Component type returned by factory.
 * We need to support different scenarios (dynamic/static) but in the end we get a React component
 */
type ComponentType = Module | LazyModule;

/**
 * Class used to generate and use a component factory with multi-project support
 * Used in a next.js app,
 */
export class ComponentFactoryCreator {
  protected components: Map<string, ComponentType>;
  protected DEFAULT_EXPORT_NAME = 'Default';

  constructor(protected config: FactoryCreatorConfig) {
    this.components = new Map([...config.components]);
    this.setProjectComponents();
  }

  /**
   * componentModule uses 'import(...)' because primary usage of it to get not only 'React Component' (default export) but all named exports.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
   * @param {ModuleFactoryConfig} [config] factory config
   */
  getModuleFactory(config: ModuleFactoryConfig = {}): ModuleFactory {
    const { projectName } = config;

    return (componentName: string) => {
      const component = this.getComponent({ projectName, componentName });

      // check that component is lazy loading module
      if (component && !('default' in component) && component.module) {
        // return js dynamic import
        return component.module();
      }

      return component as Module;
    };
  }

  /**
   * componentFactory uses 'dynamic(...)' because primary usage of it to render 'React Component' (default export).
   * @see https://nextjs.org/docs/advanced-features/dynamic-import
   *
   * At the end you will have single preloaded script for each lazy loading module.
   * Editing mode doesn't work well with dynamic components in nextjs: dynamic components are not displayed without refresh after a rendering is added.
   * This happens beacuse Sitecore editors simply insert updated HTML generated on server side. This conflicts with nextjs dynamic logic as no HTML gets rendered for dynamic component
   * So, for dynamic components in editing mode we would use require() while preserving dynamic logic for non-editing scenarios
   * As we need to be able to seamlessly work with dynamic components in both editing and normal modes, different methods world be called under component.element()
   * @param {ComponentFactoryConfig} [config] factory config
   */
  getComponentFactory(config: ComponentFactoryConfig = {}): ComponentFactory {
    const { projectName, isEditing } = config;

    return (componentName: string, exportName?: string) => {
      const component = this.getComponent({ projectName, componentName });

      if (!component) return null;

      const lazyComponent = (component as LazyModule).element;

      // check if component should be dynamically imported
      if (lazyComponent) {
        // return next.js dynamic import
        return lazyComponent(isEditing);
      }

      if (component && exportName && exportName !== this.DEFAULT_EXPORT_NAME) {
        return (component as Module)[exportName];
      }

      return (component as Module)?.Default || (component as Module)?.default || component;
    };
  }

  /**
   * Merge project component map to components map.
   * Populates project component keys with project name prefix
   * @example 'ContentBlock' -> 'Basic_ContentBlock'
   */
  protected setProjectComponents = (): void => {
    if (!this.config.projectComponents) return;

    this.config.projectComponents.forEach((projectComponents, projectName) => {
      Object.entries(projectComponents).forEach(([componentName, component]) => {
        this.components.set(this.getProjectComponentName(projectName, componentName), component);
      });
    });
  };

  protected getProjectComponentName(projectName: string, componentName: string) {
    return `${projectName}_${componentName}`;
  }

  protected getComponent({
    projectName,
    componentName,
  }: {
    projectName?: string;
    componentName: string;
  }) {
    if (projectName) {
      return (
        this.components.get(this.getProjectComponentName(projectName, componentName)) ||
        this.components.get(componentName)
      );
    } else {
      return this.components.get(componentName);
    }
  }
}
