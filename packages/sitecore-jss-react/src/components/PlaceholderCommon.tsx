import React from 'react';
import PropTypes, { Requireable } from 'prop-types';
import { MissingComponent } from '../components/MissingComponent';
import { ComponentFactory } from '../components/sharedTypes';
import { ComponentRendering, RouteData, Field, Item, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { convertAttributesToReactProps } from '../utils';

export interface PlaceholderProps {
  /** Name of the placeholder to render. */
  name: string;
  /** Rendering data to be used when rendering the placeholder. */
  rendering:
  | ComponentRendering
  | RouteData;
  /**
   * A factory function that will receive a componentName and return an instance of a React component.
   * When rendered within a <SitecoreContext> component, defaults to the context componentFactory.
   */
  componentFactory?: ComponentFactory;
  /**
   * An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
   * Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.
   */
  fields?: {
    [name: string]:
    | Field
    | Item[];
  };
  /**
   * An object of rendering parameter names/values that are aggregated and propagated through the component tree created by a placeholder.
   * Any component or placeholder rendered by a placeholder will have access to this data via `props.params`.
   */
  params?: {
    [name: string]: string;
  };

  /**
   * A component that is rendered in place of any components that are in this placeholder,
   * but do not have a definition in the componentFactory (i.e. don't have a React implementation)
   */
  missingComponentComponent?: React.ComponentType<any>;

  /**
   * A component that is rendered in place of the placeholder when an error occurs rendering
   * the placeholder
   */
  errorComponent?: React.ComponentType<any>;

  [key: string]: any;
}

export class PlaceholderCommon<T extends PlaceholderProps> extends React.Component<T> {
  static propTypes = {
    rendering: PropTypes.oneOfType([
      PropTypes.object as Requireable<RouteData>,
      PropTypes.object as Requireable<ComponentRendering>
    ]).isRequired,
    fields: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.object as Requireable<Field>,
      PropTypes.object as Requireable<Item[]>
    ]).isRequired),
    params: PropTypes.objectOf(PropTypes.string.isRequired),
    missingComponentComponent: PropTypes.object as Requireable<React.ComponentType<any>>,
    errorComponent: PropTypes.object as Requireable<React.ComponentType<any>>,
  };

  nodeRefs: any[];
  state: Readonly<{ error?: Error }>;

  static getPlaceholderDataFromRenderingData(rendering: ComponentRendering | RouteData, name: string) {
    let result;
    if (rendering && rendering.placeholders && Object.keys(rendering.placeholders).length > 0) {
      result = rendering.placeholders[name];
    } else {
      result = null;
    }

    if (!result) {
      console.warn(
        `Placeholder '${name}' was not found in the current rendering data`,
        JSON.stringify(rendering, null, 2)
      );

      return [];
    }

    return result;
  }

  constructor(props: T) {
    super(props);
    this.nodeRefs = [];
    this.state = {};
    this.addRef = this.addRef.bind(this);
    this.updateKeyAttributes = this.updateKeyAttributes.bind(this);
    this.createRawElement = this.createRawElement.bind(this);
  }

  componentDidMount() {
    this.updateKeyAttributes();
  }

  componentDidUpdate() {
    this.updateKeyAttributes();
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  getComponentsForRenderingData(placeholderData: (ComponentRendering | HtmlElementRendering)[]) {
    const {
      name,
      fields: placeholderFields,
      params: placeholderParams,
      missingComponentComponent,
      ...placeholderProps
    } = this.props;

    return placeholderData.map((rendering: any, index: number) => {
      const key = rendering.uid ? rendering.uid : `component-${index}`;
      const commonProps = { key };

      // if the element is not a 'component rendering', render it 'raw'
      if (!rendering.componentName && rendering.name) {
        return this.createRawElement(rendering, commonProps);
      }

      const componentForRendering = this.getComponentForRendering(rendering);

      if (!componentForRendering) {
        console.error(
          `Placeholder ${name} contains unknown component ${rendering.componentName}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`
        );
      }

      const component: React.ComponentType<any> =
        componentForRendering || missingComponentComponent! || MissingComponent;

      const finalProps = {
        ...commonProps,
        ...placeholderProps,
        ...((placeholderFields || rendering.fields) && {
          fields: { ...placeholderFields, ...rendering.fields },
        }),
        ...((placeholderParams || rendering.params) && {
          params: { ...placeholderParams, ...rendering.params },
        }),
        rendering,
      };

      return React.createElement(component, finalProps);
    })
    .filter(Boolean);
  }

  getComponentForRendering(renderingDefinition: { componentName: string }) {
    const componentFactory = this.props.componentFactory;

    if (!componentFactory || typeof componentFactory !== 'function') {
      console.warn(`No componentFactory was available to service request for component ${renderingDefinition}`);
      return null;
    }

    return componentFactory(renderingDefinition.componentName);
  }

  addRef(nodeRef: any) {
    this.nodeRefs.push(nodeRef);
  }

  createRawElement(elem: any, baseProps: any) {
    if (!elem.name) {
      console.error(
        '"elem.name" is undefined in "createRawElement". Something is likely wrong with your component data. Ensure that your components have a name.'
      );
      return null;
    }
    const attributes: any = convertAttributesToReactProps(elem.attributes);

    const props: any = {
      ...baseProps,
      ...attributes,
      dangerouslySetInnerHTML: { __html: elem.contents },
    };

    /* Since we can't set the "key" attribute via React, stash it
     * so we can set in the DOM after render.
     */
    if (attributes && attributes.chrometype === 'placeholder') {
      props.phkey = elem.attributes.key; // props that get rendered as dom attribute names need to be lowercase, otherwise React complains.
      props.ref = this.addRef; // only need ref for placeholder containers, trying to add it to other components (e.g. stateless components) may result in a warning.
    }

    return React.createElement(elem.name, props);
  }

  updateKeyAttributes() {
    if (!this.nodeRefs) {
      return;
    }

    this.nodeRefs.forEach((ref: any) => {
      if (ref && ref.getAttribute) {
        // ref might be a wrapped component, so check for existence of getAttribute method
        const key = ref.getAttribute('phkey');
        if (key) {
          // need to manually set the 'key' attribute after component mount because
          // 'key' is a reserved attribute/prop in React. so it will never be rendered
          // as an html attribute.
          ref.setAttribute('key', key);
        }
      }
    });
  }
}