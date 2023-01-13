/* eslint-disable jsdoc/check-param-names */
/* eslint-disable jsdoc/require-param */

type FactoryCreatorConfig = {
  components: Map<string, any>;
  projectComponents?: Map<string, { [key: string]: any }>;
};

type ComponentFactoryConfig = { projectName?: string; isEditing?: boolean };

type ModuleFactoryConfig = { projectName?: string };

export class FactoryCreator {
  protected components: Map<string, any>;
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
  getModuleFactory(config: ModuleFactoryConfig = {}) {
    const { projectName } = config;

    return (componentName: string) => {
      const component = this.getComponent({ projectName, componentName });

      // check that component is lazy loading module
      if (!component?.default && component?.module) {
        // return js dynamic import
        return component.module();
      }

      return component;
    };
  }

  /**
   * componentFactory uses 'dynamic(...)' because primary usage of it to render 'React Component' (default export).
   * @see https://nextjs.org/docs/advanced-features/dynamic-import
   *
   * At the end you will have single preloaded script for each lazy loading module.
   * Editing mode doesn't work well with dynamic components in nextjs: dynamic components are not displayed without refresh after a rendering is added.
   * This happens beacuse Sitecore editors simply insert updated HTML generated on server side. This conflicts with nextjs dynamic logic as no HTML gets rendered for dynamic component
   * So we use require() to obtain dynamic components in editing mode while preserving dynamic logic for non-editing scenarios
   * As we need to be able to seamlessly work with dynamic components in both editing and normal modes, different componentFactory functions will be passed to app
   * @param {ComponentFactoryConfig} [config] factory config
   */
  getComponentFactory(config: ComponentFactoryConfig = {}) {
    const { projectName, isEditing } = config;

    return (componentName: string, exportName?: string) => {
      const component = this.getComponent({ projectName, componentName });

      // check that component should be dynamically imported
      if (component?.element) {
        // return next.js dynamic import
        return component.element(isEditing);
      }

      if (exportName && exportName !== this.DEFAULT_EXPORT_NAME) {
        return component[exportName];
      }

      return component?.Default || component?.default || component;
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
