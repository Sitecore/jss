import React, { ComponentType } from 'react';
import PropTypes, { Requireable } from 'prop-types';
import { MissingComponent } from './MissingComponent';
import { ComponentFactory, JssComponentType } from './sharedTypes';
import {
  ComponentRendering,
  RouteData,
  Field,
  Item,
  HtmlElementRendering,
  EditMode,
} from '@sitecore-jss/sitecore-jss/layout';
import { convertAttributesToReactProps } from '../utils';
import { HiddenRendering, HIDDEN_RENDERING_NAME } from './HiddenRendering';
import { FEaaSComponent, FEAAS_COMPONENT_RENDERING_NAME } from './FEaaSComponent';
import { FEaaSWrapper, FEAAS_WRAPPER_RENDERING_NAME } from './FEaaSWrapper';
import { BYOCComponent, BYOC_COMPONENT_RENDERING_NAME } from './BYOCComponent';
import { BYOCWrapper, BYOC_WRAPPER_RENDERING_NAME } from './BYOCWrapper';
import { SitecoreContextValue } from './SitecoreContext';
import { PlaceholderMetadata } from './PlaceholderMetadata';
import ErrorBoundary from './ErrorBoundary';

type ErrorComponentProps = {
  [prop: string]: unknown;
};

/** Provided for the component which represents rendering data */
export type ComponentProps = {
  [key: string]: unknown;
  rendering: ComponentRendering;
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
   * Modify final props of component (before render) provided by rendering data.
   * Can be used in case when you need to insert additional data into the component.
   * @param {ComponentProps} componentProps component props to be modified
   * @returns {ComponentProps} modified or initial props
   */
  modifyComponentProps?: (componentProps: ComponentProps) => ComponentProps;
  /**
   * A component that is rendered in place of any components that are in this placeholder,
   * but do not have a definition in the componentFactory (i.e. don't have a React implementation)
   */
  missingComponentComponent?: React.ComponentClass<unknown> | React.FC<unknown>;

  /**
   * A component that is rendered in place of any components that are hidden
   */
  hiddenRenderingComponent?: React.ComponentClass<unknown> | React.FC<unknown>;

  /**
   * A component that is rendered in place of the placeholder when an error occurs rendering
   * the placeholder
   */
  errorComponent?: React.ComponentClass<ErrorComponentProps> | React.FC<ErrorComponentProps>;
  /**
   *  Context data from the Sitecore Layout Service
   */
  sitecoreContext: SitecoreContextValue;
  /**
   * The message that gets displayed while component is loading
   */
  componentLoadingMessage?: string;
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
    hiddenRenderingComponent: PropTypes.oneOfType([
      PropTypes.object as Requireable<React.ComponentClass<unknown>>,
      PropTypes.func as Requireable<React.FC<unknown>>,
    ]),
    errorComponent: PropTypes.oneOfType([
      PropTypes.object as Requireable<React.ComponentClass<unknown>>,
      PropTypes.func as Requireable<React.FC<unknown>>,
    ]),
    modifyComponentProps: PropTypes.func,
    sitecoreContext: PropTypes.object as Requireable<SitecoreContextValue>,
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
    /** [SXA] it needs for deleting dynamics placeholder when we set him number(props.name) of container.
    from backend side we get common name of placeholder is called 'nameOfContainer-{*}' where '{*}' marker for replacing **/
    if (rendering?.placeholders) {
      Object.keys(rendering.placeholders).forEach((placeholder) => {
        const patternPlaceholder =
          placeholder.indexOf('{*}') !== -1
            ? new RegExp(`^${placeholder.replace(/\{\*\}+/i, '\\d+')}$`)
            : null;

        if (patternPlaceholder && patternPlaceholder.test(name)) {
          rendering.placeholders[name] = rendering.placeholders[placeholder];
          delete rendering.placeholders[placeholder];
        }
      });
    }

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

  getSXAParams(rendering: ComponentRendering) {
    if (!rendering.params) return {};
    return (
      rendering.params.FieldNames && {
        styles: `${rendering.params.GridParameters || ''} ${rendering.params.Styles || ''}`,
      }
    );
  }

  getComponentsForRenderingData(placeholderData: (ComponentRendering | HtmlElementRendering)[]) {
    const {
      name,
      fields: placeholderFields,
      params: placeholderParams,
      missingComponentComponent,
      hiddenRenderingComponent,
      ...placeholderProps
    } = this.props;

    const transformedComponents = placeholderData
      .map((rendering: ComponentRendering | HtmlElementRendering, index: number) => {
        const key = (rendering as ComponentRendering).uid
          ? (rendering as ComponentRendering).uid
          : `component-${index}`;
        const commonProps = { key };
        let isEmpty = false;
        // if the element is not a 'component rendering', render it 'raw'
        if (
          !(rendering as ComponentRendering).componentName &&
          (rendering as HtmlElementRendering).name
        ) {
          return this.createRawElement(rendering as HtmlElementRendering, commonProps);
        }

        const componentRendering = rendering as ComponentRendering;

        let component;

        if (componentRendering.componentName === HIDDEN_RENDERING_NAME) {
          component = hiddenRenderingComponent ?? HiddenRendering;
          isEmpty = true;
        } else if (!componentRendering.componentName) {
          component = () => <></>;
          isEmpty = true;
        } else {
          component = this.getComponentForRendering(componentRendering);
        }

        // Fallback/defaults for Sitecore Component renderings (in case not defined in component factory)
        if (!component) {
          if (componentRendering.componentName === FEAAS_COMPONENT_RENDERING_NAME) {
            component = FEaaSComponent;
          } else if (componentRendering.componentName === FEAAS_WRAPPER_RENDERING_NAME) {
            component = FEaaSWrapper;
          } else if (componentRendering.componentName === BYOC_COMPONENT_RENDERING_NAME) {
            component = BYOCComponent;
          } else if (componentRendering.componentName === BYOC_WRAPPER_RENDERING_NAME) {
            component = BYOCWrapper;
          }
        }

        if (!component) {
          console.error(
            `Placeholder ${name} contains unknown component ${componentRendering.componentName}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`
          );

          component = missingComponentComponent ?? MissingComponent;
          isEmpty = true;
        }

        const finalProps = {
          ...commonProps,
          ...placeholderProps,
          ...((placeholderFields || componentRendering.fields) && {
            fields: { ...placeholderFields, ...componentRendering.fields },
          }),
          ...((placeholderParams || componentRendering.params) && {
            params: {
              ...placeholderParams,
              ...componentRendering.params,
              // Provide SXA styles
              ...this.getSXAParams(componentRendering),
            },
          }),
          rendering: componentRendering,
        };

        let rendered = React.createElement<{ [attr: string]: unknown }>(
          component as React.ComponentType,
          this.props.modifyComponentProps ? this.props.modifyComponentProps(finalProps) : finalProps
        );

        if (!isEmpty) {
          // assign type based on passed element - type='text/sitecore' should be ignored when renderEach Placeholder prop function is being used
          const type = rendered.props.type === 'text/sitecore' ? rendered.props.type : '';
          // wrapping with error boundary could cause problems in case where parent component uses withPlaceholder HOC and tries to access its children props
          // that's why we need to expose element's props here
          rendered = (
            <ErrorBoundary
              key={rendered.type + '-' + index}
              errorComponent={this.props.errorComponent}
              componentLoadingMessage={this.props.componentLoadingMessage}
              type={type}
              isDynamic={(component as JssComponentType).render?.preload ? true : false}
              {...rendered.props}
            >
              {rendered}
            </ErrorBoundary>
          );
        }

        // if editMode is equal to 'metadata' then emit shallow chromes for hydration in Pages
        if (this.props.sitecoreContext?.editMode === EditMode.Metadata) {
          return (
            <PlaceholderMetadata key={key} uid={(rendering as ComponentRendering).uid}>
              {rendered}
            </PlaceholderMetadata>
          );
        }

        return rendered;
      })
      .filter((element) => element); // remove nulls

    if (this.props.sitecoreContext?.editMode === EditMode.Metadata) {
      // default value of uid for root placeholder when uid is not present.
      const default_UID = '00000000-0000-0000-0000-000000000000';
      return [
        <PlaceholderMetadata
          key={(this.props.rendering as ComponentRendering).uid}
          uid={(this.props.rendering as ComponentRendering).uid || default_UID}
          placeholderName={name}
        >
          {transformedComponents}
        </PlaceholderMetadata>,
      ];
    }

    return transformedComponents;
  }

  getComponentForRendering(renderingDefinition: ComponentRendering): ComponentType | null {
    const componentFactory = this.props.componentFactory;

    if (!componentFactory || typeof componentFactory !== 'function') {
      console.warn(
        `No componentFactory was available to service request for component ${renderingDefinition}`
      );
      return null;
    }

    // Render SXA Rendering Variant
    if (renderingDefinition.params?.FieldNames) {
      return componentFactory(
        renderingDefinition.componentName,
        renderingDefinition.params.FieldNames
      );
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
