import React, { ComponentType } from 'react';
import { resetEditorChromes } from '..';

export const withEditorChromes = (
  WrappedComponent: React.ComponentClass<unknown> | React.FC<unknown>
) => {
  class Enhancer extends React.Component<unknown> {
    displayName: string =
      (WrappedComponent as ComponentType).displayName || WrappedComponent.name || 'Component';

    componentDidUpdate() {
      resetEditorChromes();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Enhancer as React.ComponentClass;
};
