import React from 'react';
import { resetExperienceEditorChromes } from '../';

export const withExperienceEditorChromes = (WrappedComponent: React.ComponentClass<any> | React.SFC<any>) => {
  class Enhancer extends React.Component<{}> {
    displayName: string = (WrappedComponent as any).displayName || WrappedComponent.name || 'Component';

    componentDidUpdate() {
      resetExperienceEditorChromes();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Enhancer as React.ComponentClass;
};
