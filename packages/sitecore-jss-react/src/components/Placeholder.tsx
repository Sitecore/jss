import React from 'react';
import { PlaceholderCommon, PlaceholderProps } from './PlaceholderCommon';
import { withComponentFactory } from '../enhancers/withComponentFactory';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';

export interface PlaceholderComponentProps extends PlaceholderProps {
  /**
   * Render props function that enables control over the rendering of the components in the placeholder.
   * Useful for techniques like wrapping each child in a wrapper component.
   */
  render?: (components: React.ReactNode[], data: (ComponentRendering | HtmlElementRendering)[], props: PlaceholderProps) => React.ComponentClass<any> | React.SFC<any>;

  /**
   * Render props function that is called for each non-system component added to the placeholder.
   * Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.
   */
  renderEach?: (components: React.ReactNode[], data: (ComponentRendering | HtmlElementRendering)[], props: PlaceholderProps) => React.ComponentClass<any> | React.SFC<any>;
}

function isRawRendering(rendering: HtmlElementRendering | ComponentRendering): rendering is HtmlElementRendering {
  return !(rendering as ComponentRendering).componentName && (rendering as HtmlElementRendering).name !== undefined;
}

class PlaceholderComponent extends PlaceholderCommon {
  static propTypes = PlaceholderCommon.propTypes;

  constructor(props: PlaceholderComponentProps) {
    super(props);
  }

  render() {
    let childProps: any = {...this.props};

    delete childProps.componentFactory;

    if (this.state.error) {
      if (childProps.errorComponent) {
        return <childProps.errorComponent error={this.state.error} />;
      }

      return (
        <div className="sc-jss-placeholder-error">
          A rendering error occurred: {this.state.error.message}.
        </div>
      );
    }

    const renderingData = childProps.rendering;

    const placeholderData = PlaceholderCommon.getPlaceholderDataFromRenderingData(renderingData, this.props.name);
    const components =  this.getComponentsForRenderingData(placeholderData);

    if (this.props.renderEmpty && placeholderData.every((rendering: ComponentRendering | HtmlElementRendering) => isRawRendering(rendering))) {
      return this.props.renderEmpty(components, placeholderData, childProps);
    } else if (this.props.render) {
      return this.props.render(components, placeholderData, childProps);
    } else if (this.props.renderEach) {
      return components.map((component, index) => {
        if (component && component.props && component.props.type === 'text/sitecore') {
          return component;
        }

        return this.props.renderEach(component, index);
      });
    } else {
      return components;
    }
  }
}

export const Placeholder = withComponentFactory(PlaceholderComponent);
