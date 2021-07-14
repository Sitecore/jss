import React, { ComponentType } from 'react';
import PropTypes, { Requireable } from 'prop-types';
import { MissingComponent } from '../components/MissingComponent';
import { ComponentFactory } from '../components/sharedTypes';
import {
  ComponentRendering,
  RouteData,
  Field,
  Item,
  HtmlElementRendering,
} from '@sitecore-jss/sitecore-jss';
import { convertAttributesToReactProps } from '../utils';

type ErrorComponentProps = {
  [prop: string]: unknown;
};

export interface PlaceholderProps {
  [key: string]: unknown;
  /** Name of the placeholder to render. */
  name: string;
  /** Rendering data to be used when rendering the placeholder. */
  rendering: ComponentRendering | RouteData;
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
    [name: string]: Field | Item[];
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
  missingComponentComponent?: React.ComponentClass<unknown> | React.FC<unknown>;

  /**
   * A component that is rendered in place of the placeholder when an error occurs rendering
   * the placeholder
   */
  errorComponent?: React.ComponentClass<ErrorComponentProps> | React.FC<ErrorComponentProps>;
}

export class PlaceholderCommon<T extends PlaceholderProps> extends React.Component<T> {
  static propTypes = {
    rendering: PropTypes.oneOfType([
      PropTypes.object as Requireable<RouteData>,
      PropTypes.object as Requireable<ComponentRendering>,
    ]).isRequired,
    fields: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object as Requireable<Field>,
        PropTypes.object as Requireable<Item[]>,
      ]).isRequired
    ),
    params: PropTypes.objectOf(PropTypes.string.isRequired),
    missingComponentComponent: PropTypes.oneOfType([
      PropTypes.object as Requireable<React.ComponentClass<unknown>>,
      PropTypes.func as Requireable<React.FC<unknown>>,
    ]),
    errorComponent: PropTypes.oneOfType([
      PropTypes.object as Requireable<React.ComponentClass<unknown>>,
      PropTypes.func as Requireable<React.FC<unknown>>,
    ]),
  };

  nodeRefs: Element[];
  state: Readonly<{ error?: Error }>;

  constructor(props: T) {
    super(props);
    this.nodeRefs = [];
    this.state = {};
    this.addRef = this.addRef.bind(this);
    this.updateKeyAttributes = this.updateKeyAttributes.bind(this);
    this.createRawElement = this.createRawElement.bind(this);
  }

  static getPlaceholderDataFromRenderingData(
    rendering: ComponentRendering | RouteData,
    name: string
  ) {
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

    return placeholderData
      .map((rendering: ComponentRendering | HtmlElementRendering, index: number) => {
        const key = (rendering as ComponentRendering).uid
          ? (rendering as ComponentRendering).uid
          : `component-${index}`;
        const commonProps = { key };

        // if the element is not a 'component rendering', render it 'raw'
        if (
          !(rendering as ComponentRendering).componentName &&
          (rendering as HtmlElementRendering).name
        ) {
          return this.createRawElement(rendering as HtmlElementRendering, commonProps);
        }

        const componentRendering = rendering as ComponentRendering;

        let component = this.getComponentForRendering(componentRendering);
        if (!component) {
          console.error(
            `Placeholder ${name} contains unknown component ${componentRendering.componentName}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`
          );

          component = missingComponentComponent ?? MissingComponent;
        }

        const finalProps = {
          ...commonProps,
          ...placeholderProps,
          ...((placeholderFields || componentRendering.fields) && {
            fields: { ...placeholderFields, ...componentRendering.fields },
          }),
          ...((placeholderParams || componentRendering.params) && {
            params: { ...placeholderParams, ...componentRendering.params },
          }),
          rendering: componentRendering,
        };

        return React.createElement<{ [attr: string]: unknown }>(
          component as React.ComponentType,
          finalProps
        );
      })
      .filter((element) => element); // remove nulls
  }

  getComponentForRendering(renderingDefinition: { componentName: string }): ComponentType | null {
    const componentFactory = this.props.componentFactory;

    if (!componentFactory || typeof componentFactory !== 'function') {
      console.warn(
        `No componentFactory was available to service request for component ${renderingDefinition}`
      );
      return null;
    }

    return componentFactory(renderingDefinition.componentName);
  }

  addRef(nodeRef: Element) {
    this.nodeRefs.push(nodeRef);
  }

  createRawElement(elem: HtmlElementRendering, baseProps: { key?: string }) {
    if (!elem.name) {
      console.error(
        '"elem.name" is undefined in "createRawElement". Something is likely wrong with your component data. Ensure that your components have a name.'
      );
      return null;
    }
    const attributes = convertAttributesToReactProps(elem.attributes);

    const props: {
      [attr: string]: unknown;
      key?: string;
      dangerouslySetInnerHTML?: {
        __html: string | null;
      };
    } = {
      ...baseProps,
      ...attributes,
      dangerouslySetInnerHTML: elem.contents ? { __html: elem.contents } : undefined,
    };

    /* Since we can't set the "key" attribute via React, stash it
     * so we can set in the DOM after render.
     */
    if (!Array.isArray(attributes) && attributes && attributes.chrometype === 'placeholder') {
      props.phkey = elem.attributes.key; // props that get rendered as dom attribute names need to be lowercase, otherwise React complains.
      props.ref = this.addRef; // only need ref for placeholder containers, trying to add it to other components (e.g. stateless components) may result in a warning.
    }

    return React.createElement(elem.name, props);
  }

  updateKeyAttributes() {
    if (!this.nodeRefs) {
      return;
    }

    this.nodeRefs.forEach((ref: Element) => {
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
