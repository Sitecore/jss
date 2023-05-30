import { ComponentType } from 'react';
import { ComponentBuilderBase } from '@sitecore-jss/sitecore-jss';
import { ComponentFactory } from './components/sharedTypes';

/**
 * React implementation of component builder
 */
export class ComponentBuilder extends ComponentBuilderBase<ComponentType> {
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
