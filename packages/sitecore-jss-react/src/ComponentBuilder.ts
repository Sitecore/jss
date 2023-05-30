import { ComponentType } from 'react';
import { ComponentBuilderBase } from '@sitecore-jss/sitecore-jss';
import { ComponentFactory } from './components/sharedTypes';

export class ComponentBuilder extends ComponentBuilderBase<ComponentType> {
  getComponentFactory(): ComponentFactory {
    return (componentName: string) => {
      const component = this.components.get(componentName);

      if (!component) return null;

      return component;
    };
  }
}
