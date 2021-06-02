import React, { createRef } from 'react';
import { PlaceholderCommon, PlaceholderProps } from './PlaceholderCommon';
import { withComponentFactory } from '../enhancers/withComponentFactory';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';

export interface PlaceholderComponentProps extends PlaceholderProps {
  /**
   * Render props function that is called when the placeholder contains no content components.
   * Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct
   */
  renderEmpty?: (
    components: React.ReactNode[]
  ) => React.ComponentClass<unknown> | React.SFC<unknown> | React.ReactNode;
  /**
   * Render props function that enables control over the rendering of the components in the placeholder.
   * Useful for techniques like wrapping each child in a wrapper component.
   */
  render?: (
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

const isHorizonEditing = (): boolean => {
  // Horizon canvas state is injected. Example:
  // <script id="hrz-canvas-state" type="application/json">
  // {
  //   "type": "State",
  //   "data": {
  //     "itemId": "45be1451-fa83-5f80-9f0d-d7457b480b58",
  //     "siteName": "JssNextWeb",
  //     "language": "en",
  //     "deviceId": "fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3",
  //     "pageMode": "EDIT"
  //   }
  // }
  // </script>
  if (typeof window === 'undefined') return false;

  const stateEl = window.document.querySelector('#hrz-canvas-state');
  if (!stateEl || stateEl.innerHTML === '') {
    return false;
  }
  const state = JSON.parse(stateEl.innerHTML);
  return state.data?.pageMode === 'EDIT';
};

class PlaceholderComponent extends PlaceholderCommon<PlaceholderComponentProps> {
  static propTypes = PlaceholderCommon.propTypes;
  placeholderRef: React.RefObject<HTMLDivElement>;

  horizonEmptyPlaceholders: { key: string; element: Element }[] | null;

  constructor(props: PlaceholderComponentProps) {
    super(props);

    this.placeholderRef = createRef();
    this.horizonEmptyPlaceholders = null;
  }

  componentDidMount() {
    if (isHorizonEditing()) {
      this.resetHorizonEmptyPlaceholders();
    }
  }

  /**
   * Insert empty placeholders in correct places.
   * They were removed by React after first render,
   * since LayoutData doesn't contain `empty placeholder` tag
   */
  resetHorizonEmptyPlaceholders() {
    if (!this.horizonEmptyPlaceholders) {
      return;
    }

    this.horizonEmptyPlaceholders.forEach((ph) => {
      const placeholderOpenTag = this.placeholderRef.current?.querySelector(
        // We are going throw all saved keys and trying to find `Placeholder open tag` related to current placeholder
        `:scope > code[kind="open"][class="scpm"][chrometype="placeholder"][key="${ph.key}"]`
      );

      placeholderOpenTag && placeholderOpenTag.insertAdjacentElement('afterend', ph.element);
    });
  }

  collectHorizonEmptyPlaceholders() {
    // Grab all empty placeholders on the page, cause we can't search children and use `placeholderRef` before mount
    const emptyPlaceholders = Array.prototype.slice.call(
      window.document.querySelectorAll('[class*="empty-placeholder"]')
    );
    this.horizonEmptyPlaceholders = emptyPlaceholders.map(
      // `Placeholder open tag` contains `key` attribute which we can store
      // to identify position where we need to insert empty placeholder
      (el) => ({
        key: el.previousElementSibling?.getAttribute('key') || '',
        element: el,
      })
    );
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

    const isEmptyPlaceholder = placeholderData.every(
      (rendering: ComponentRendering | HtmlElementRendering) => isRawRendering(rendering)
    );

    const components = this.getComponentsForRenderingData(placeholderData);

    if (isEmptyPlaceholder) {
      if (typeof window !== 'undefined' && isHorizonEditing() && !this.placeholderRef.current) {
        this.collectHorizonEmptyPlaceholders();
      }

      return (
        <div ref={this.placeholderRef}>
          {this.props.renderEmpty ? this.props.renderEmpty(components) : components}
        </div>
      );
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
