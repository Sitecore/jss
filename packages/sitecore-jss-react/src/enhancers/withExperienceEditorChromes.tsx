import React, { ComponentType } from 'react';
import { resetExperienceEditorChromes } from '../';

export const withExperienceEditorChromes = (WrappedComponent: React.ComponentClass<unknown> | React.SFC<unknown>) => {
  class Enhancer extends React.Component<unknown> {
    displayName: string = (WrappedComponent as ComponentType).displayName || WrappedComponent.name || 'Component';

    componentDidUpdate() {
      resetExperienceEditorChromes();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Enhancer as React.ComponentClass;
};
