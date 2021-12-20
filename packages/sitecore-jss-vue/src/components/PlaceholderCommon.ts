/* eslint-disable no-use-before-define */
import {
  ComponentRendering,
  Field,
  HtmlElementRendering,
  Item,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { HorizonEditor, resetEditorChromes } from '@sitecore-jss/sitecore-jss/utils';
import { Component, h, VNode, DefineComponent, ref, watchEffect } from 'vue';
import { MissingComponent } from './MissingComponent';
import { HiddenRendering, HIDDEN_RENDERING_NAME } from './HiddenRendering';
import { ComponentFactory } from './sharedTypes';

export interface PlaceholderProps {
  [key: string]: any;
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
  missingComponentComponent?: DefineComponent;

  /**
   * A component that is rendered in place of any components that are hidden.
   */
  hiddenRenderingComponent?: DefineComponent;

  /**
   * A component that is rendered in place of the placeholder when an error occurs rendering
   * the placeholder
   */
  errorComponent?: DefineComponent;
}

export type JssDynamicComponent = Component & { isxEditorComponent?: boolean };

export const getPlaceholderDataFromRenderingData = (
  rendering: ComponentRendering | RouteData,
  name: string
) => {
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
};

/**
 * Gets Vue elements (VNodes) from placeholder data, using componentFactory to resolve component definitions
 * and createVueElement to create VNodes for use in a Vue `render` function. Note: you can't use VNodes in
 * component templates. You'll need to convert the VNodes to "renderable" components, a.k.a. dynamic components.
 * @see convertVNodesToDynamicComponents or @see getDynamicComponentsFromRenderingData for options.
 * @param {Array<ComponentRendering | HtmlElementRendering>} placeholderData
 * @param {PlaceholderProps} placeholderProps
 * @param {ComponentFactory} [componentFactory]
 * @returns {VNode[]} vnodes
 */
export function getVNodesForRenderingData(
  placeholderData: Array<ComponentRendering | HtmlElementRendering>,
  placeholderProps: PlaceholderProps,
  componentFactory?: ComponentFactory
) {
  const {
    name: placeholderName,
    fields: placeholderFields,
    params: placeholderParams,
    missingComponentComponent,
    hiddenRenderingComponent,
    ...unmappedPlaceholderProps
  } = placeholderProps;

  return placeholderData
    .map((rendering: any, index: number) => {
      const key = rendering.uid ? rendering.uid : `component-${index}`;

      // if the element is not a 'component rendering', render it 'raw'
      if (!rendering.componentName && rendering.name) {
        return createRawElement(rendering);
      }

      let component: any;

      if (rendering.componentName === HIDDEN_RENDERING_NAME) {
        component = hiddenRenderingComponent || HiddenRendering;
      } else {
        component = getComponentForRendering(rendering, componentFactory);
      }

      if (!component) {
        console.error(
          `Placeholder ${placeholderName} contains unknown component ${rendering.componentName}. Ensure that a Vue component exists for it, and that it is mapped in your component factory.`
        );
        component = missingComponentComponent || MissingComponent;
      }

      const finalProps: any = { ...unmappedPlaceholderProps, rendering };

      if (placeholderFields || rendering.fields) {
        finalProps.fields = { ...placeholderFields, ...rendering.fields };
      }
      if (placeholderParams || rendering.params) {
        finalProps.params = { ...placeholderParams, ...rendering.params };
      }

      return h(component, { ...finalProps, key });
    })
    .filter((element) => element) as VNode[]; // remove nulls;
}

/**
 * Convenience method that calls {@link getVNodesForRenderingData} and {@link convertVNodesToDynamicComponents}
 * to return "renderable" components, i.e. components that can be rendered in a Vue template, a.k.a. dynamic components.
 * @param {Array<ComponentRendering | HtmlElementRendering>} placeholderData
 * @param {PlaceholderProps} placeholderProps
 * @param {ComponentFactory} componentFactory
 * @returns {JssDynamicComponent[]} dynamic components
 */
export function getDynamicComponentsFromRenderingData(
  placeholderData: Array<ComponentRendering | HtmlElementRendering>,
  placeholderProps: PlaceholderProps,
  componentFactory?: ComponentFactory
) {
  return convertVNodesToDynamicComponents(
    getVNodesForRenderingData(placeholderData, placeholderProps, componentFactory)
  );
}

/**
 * Converts VNodes to components that render the vnode.
 * Also evaluates VNodes to determine if they are Experience Editor components/elements and if so,
 * adds an identifying property to the component.
 * @param {VNode[]} vnodes
 * @returns {JssDynamicComponent[]} dynamic components
 */
export function convertVNodesToDynamicComponents(vnodes: VNode[]) {
  return vnodes.map((vnode) => {
    const component = {
      $props: vnode.props,
      inheritAttrs: false,

      render() {
        return vnode;
      },
    } as JssDynamicComponent;

    if (vnode.type === 'code' && vnode.props.type === 'text/sitecore') {
      component.isxEditorComponent = true;
    }
    return component;
  });
}

/**
 * @param {any} elem
 */
function createRawElement(elem: any) {
  if (!elem.name) {
    console.error(
      '"elem.name" is undefined in "createRawElement". ' +
        'Something is likely wrong with your component data. Ensure that your components have a name.'
    );
    return null;
  }

  const component = {
    setup() {
      const elRef = ref(null);

      /*
       * Since we can't set the "key" via Vue attributes
       * so we can set in the DOM after render.
       */
      if (
        !Array.isArray(elem.attributes) &&
        elem.attributes &&
        elem.attributes.chrometype === 'placeholder' &&
        elem.attributes.key
      ) {
        watchEffect(() => {
          elRef.value && elRef.value.setAttribute('key', elem.attributes.key);

          if (elRef && HorizonEditor.isActive()) {
            resetEditorChromes();
          }
        });
      }

      return () =>
        h(elem.name, {
          ...elem.attributes,
          innerHTML: elem.contents,
          ref: elRef,
        });
    },
  };

  return h(component);
}

/**
 * @param {Object} renderingDefinition
 * @param {string} renderingDefinition.componentName
 * @param {ComponentFactory} [componentFactory]
 */
function getComponentForRendering(
  renderingDefinition: { componentName: string },
  componentFactory?: ComponentFactory
) {
  if (!componentFactory) {
    console.warn(
      `No componentFactory was available to service request for component ${renderingDefinition.componentName}`
    );
    return null;
  }

  const component = componentFactory(renderingDefinition.componentName);
  return component;
}
