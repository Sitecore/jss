import React, { ComponentType } from 'react';
import { resetEditorChromes } from '..';

export const withEditorChromes = (
  WrappedComponent: React.ComponentClass<unknown> | React.SFC<unknown>
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

/**
 * @deprecated Will be removed in a future release. Please use withEditorChromes instead.
 */
export const withExperienceEditorChromes = withEditorChromes;
