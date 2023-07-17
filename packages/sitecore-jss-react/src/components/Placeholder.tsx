import React from 'react';
import { PlaceholderCommon, PlaceholderProps } from './PlaceholderCommon';
import { withComponentFactory } from '../enhancers/withComponentFactory';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss/layout';
import { HorizonEditor } from '@sitecore-jss/sitecore-jss/utils';

export interface PlaceholderComponentProps extends PlaceholderProps {
  /**
   * Render props function that is called when the placeholder contains no content components.
   * Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct
   */
  renderEmpty?: (components: React.ReactNode[]) => React.ReactNode;
  /**
   * Render props function that enables control over the rendering of the components in the placeholder.
   * Useful for techniques like wrapping each child in a wrapper component.
   */
  render?: (
    components: React.ReactNode[],
    data: (ComponentRendering | HtmlElementRendering)[],
    props: PlaceholderProps
  ) => React.ReactNode;

  /**
   * Render props function that is called for each non-system component added to the placeholder.
   * Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.
   */
  renderEach?: (component: React.ReactNode, index: number) => React.ReactNode;
}

/**
 * @param {HtmlElementRendering | ComponentRendering} rendering
 */
function isRawRendering(
  rendering: HtmlElementRendering | ComponentRendering
): rendering is HtmlElementRendering {
  return (
    !(rendering as ComponentRendering).componentName &&
    (rendering as HtmlElementRendering).name !== undefined
  );
}

class PlaceholderComponent extends PlaceholderCommon<PlaceholderComponentProps> {
  static propTypes = PlaceholderCommon.propTypes;

  isEmpty = false;

  constructor(props: PlaceholderComponentProps) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.isEmpty && HorizonEditor.isActive()) {
      HorizonEditor.resetChromes();
    }
  }

  /**
   * In case we need to render an empty placeholder, some part of the markup will be inserted by the EE,
   * so we need to separate the empty placeholder's markup and allow React reconciliation to be executed correctly
   * and retain sibling tags
   * @param {React.ReactNode | React.ReactElement[]} node react node
   * @returns react node
   */
  renderEmptyPlaceholder(node: React.ReactNode | React.ReactElement[]) {
    return <div className="sc-jss-empty-placeholder">{node}</div>;
  }

  render() {
    const childProps: PlaceholderComponentProps = { ...this.props };

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

    const placeholderData = PlaceholderCommon.getPlaceholderDataFromRenderingData(
      renderingData,
      this.props.name
    );

    const components = this.getComponentsForRenderingData(placeholderData);

    this.isEmpty = placeholderData.every((rendering: ComponentRendering | HtmlElementRendering) =>
      isRawRendering(rendering)
    );

    if (this.props.renderEmpty && this.isEmpty) {
      const rendered = this.props.renderEmpty(components);

      return components.length ? this.renderEmptyPlaceholder(rendered) : rendered;
    } else if (components.length && this.isEmpty) {
      return this.renderEmptyPlaceholder(components);
    } else if (this.props.render) {
      return this.props.render(components, placeholderData, childProps);
    } else if (this.props.renderEach) {
      const renderEach = this.props.renderEach;

      return components.map((component, index) => {
        if (component && component.props && component.props.type === 'text/sitecore') {
          return component;
        }

        return renderEach(component, index);
      });
    } else {
      return components;
    }
  }
}

export const Placeholder = withComponentFactory(PlaceholderComponent);
