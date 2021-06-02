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
  emptyPlaceholderTags: Element[] | null;
  phKeys: string[] | undefined | null;

  constructor(props: PlaceholderComponentProps) {
    super(props);

    this.placeholderRef = createRef();
    this.emptyPlaceholderTags = null;
    this.phKeys = null;
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
    if (this.emptyPlaceholderTags && this.phKeys) {
      this.emptyPlaceholderTags.forEach((emptyPhTag, i) => {
        const emptyPlaceholder = this.placeholderRef.current?.querySelector(
          // We are going throw all saved keys and trying to find `Placeholder open tag` related to current placeholder
          `:scope > code[kind="open"][class="scpm"][chrometype="placeholder"][key="${this.phKeys?.[i]}"]`
        );

        emptyPlaceholder && emptyPlaceholder.insertAdjacentElement('afterend', emptyPhTag);
      });
    }
  }

  collectHorizonEmptyPlaceholders() {
    // Grab all empty placeholders on the page, cause we can't search children and use `placeholderRef` before mount
    this.emptyPlaceholderTags = Array.prototype.slice.call(
      window.document.querySelectorAll('[class*="empty-placeholder"]')
    );
    this.phKeys = this.emptyPlaceholderTags.map(
      // `Placeholder open tag` contains `key` attribute which we can store
      // to identify position where we need to insert empty placeholder
      (el) => el.previousElementSibling?.getAttribute('key') || ''
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
