import React from 'react';
import { View } from 'react-native';
import { withComponentFactory } from '../enhancers/withComponentFactory';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { PlaceholderCommon, PlaceholderProps } from './PlaceholderCommon';

export interface PlaceholderComponentProps extends PlaceholderProps {
  /**
   * Render props function that enables control over the rendering of the components in the placeholder.
   * Useful for techniques like wrapping each child in a wrapper component.
   */
  render?: (
    components: React.ReactNode[],
    data: (ComponentRendering | HtmlElementRendering)[],
    props: PlaceholderProps
  ) => React.ComponentClass<unknown> | React.SFC<unknown>;

  /**
   * Render props function that is called when the placeholder contains no content components.
   * Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct
   */
  renderEmpty?: (
    components: React.ReactNode[],
    data: (ComponentRendering | HtmlElementRendering)[],
    props: PlaceholderProps
  ) => React.ComponentClass<unknown> | React.SFC<unknown> | React.ReactNode;

  /**
   * Render props function that is called for each non-system component added to the placeholder.
   * Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.
   */
  renderEach?: (
    component: React.ReactNode,
    index: number
  ) => React.ComponentClass<unknown> | React.SFC<unknown> | React.ReactNode;
}

function isRawRendering(
  rendering: HtmlElementRendering | ComponentRendering
): rendering is HtmlElementRendering {
  return (
    !(rendering as ComponentRendering).componentName &&
    (rendering as HtmlElementRendering).name !== undefined
  );
}

class PlaceholderComponent extends PlaceholderCommon {
  static propTypes = PlaceholderCommon.propTypes;

  constructor(props: PlaceholderComponentProps) {
    super(props);
  }

  render() {
    const props: PlaceholderComponentProps = this.props;
    const childProps: PlaceholderComponentProps = { ...this.props };

    delete childProps.componentFactory;
    delete childProps.render;
    delete childProps.renderEach;

    if (this.state.error) {
      return <View>A rendering error occurred: {this.state.error.message}.</View>;
    }

    const renderingData = childProps.rendering;

    const placeholderData = PlaceholderCommon.getPlaceholderDataFromRenderingData(
      renderingData,
      props.name
    );
    const components = this.getComponentsForRenderingData(placeholderData);

    if (
      props.renderEmpty &&
      placeholderData.every((rendering: ComponentRendering | HtmlElementRendering) =>
        isRawRendering(rendering)
      )
    ) {
      return components && props.renderEmpty(components, placeholderData, childProps);
    } else if (props.render) {
      return components && props.render(components, placeholderData, childProps);
    } else if (props.renderEach) {
      return (
        components &&
        components.map((component, index) => {
          if (component && component.props && component.props.type === 'text/sitecore') {
            return component;
          }

          return props.renderEach && props.renderEach(component, index);
        })
      );
    } else {
      return components;
    }
  }
}

export const Placeholder = withComponentFactory(PlaceholderComponent);
