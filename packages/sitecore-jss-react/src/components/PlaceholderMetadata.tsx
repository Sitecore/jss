import React, { ComponentType } from 'react';
import { MissingComponent } from './MissingComponent';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { HiddenRendering, HIDDEN_RENDERING_NAME } from './HiddenRendering';
import { FEaaSComponent, FEAAS_COMPONENT_RENDERING_NAME } from './FEaaSComponent';
import { FEaaSWrapper, FEAAS_WRAPPER_RENDERING_NAME } from './FEaaSWrapper';
import { BYOCComponent, BYOC_COMPONENT_RENDERING_NAME } from './BYOCComponent';
import { BYOCWrapper, BYOC_WRAPPER_RENDERING_NAME } from './BYOCWrapper';
import { PlaceholderProps } from './PlaceholderCommon';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  rendering: ComponentRendering;
  placeholderProps: PlaceholderProps;
  getComponentForRendering: (rendering: ComponentRendering) => ComponentType | null;
  getSXAParams: (
    rendering: ComponentRendering
  ) =>
    | {
        styles?: undefined;
      }
    | {
        styles: string;
      };
}

export type CodeBlockAttributes = {
  type: string;
  chrometype: string;
  className: string;
  kind: string;
  id: string;
};

/**
 * Retrieves the appropriate React component based on the rendering information provided.
 * This function handles special cases for hidden renderings and missing components.
 *
 * @param {ComponentRendering} componentRendering - The rendering data for the component.
 * @param {Function} getComponentForRendering - A function that returns the React component based on the rendering information.
 * @param {ComponentType} hiddenRenderingComponent - The component to render when the rendering is hidden.
 * @param {ComponentType} missingComponentComponent - The component to render when no component is found.
 * @returns {ComponentType | null} The resolved React component, or null if no valid component can be resolved.
 */
function getRendering(
  componentRendering: ComponentRendering,
  getComponentForRendering: (rendering: ComponentRendering) => ComponentType | null,
  hiddenRenderingComponent: ComponentType,
  missingComponentComponent: ComponentType
): ComponentType | null {
  if (componentRendering.componentName === HIDDEN_RENDERING_NAME) {
    return hiddenRenderingComponent ?? HiddenRendering;
  } else if (!componentRendering.componentName) {
    // eslint-disable-next-line react/display-name
    return () => <></>;
  } else {
    const component = getComponentForRendering(componentRendering);
    return component ?? getFallbackRendering(componentRendering, missingComponentComponent);
  }
}

/**
 * Determines a fallback component for a given rendering when the intended component is not found.
 *
 * @param {ComponentRendering} componentRendering - The rendering data for which to find a fallback component.
 * @param {ComponentType} missingComponentComponent - The default component to use if the specific fallback is not available.
 * @returns {ComponentType} The fallback component, or a default missing component if no specific fallback is found.
 */
function getFallbackRendering(
  componentRendering: ComponentRendering,
  missingComponentComponent: ComponentType
) {
  switch (componentRendering.componentName) {
    case FEAAS_COMPONENT_RENDERING_NAME:
      return FEaaSComponent;
    case FEAAS_WRAPPER_RENDERING_NAME:
      return FEaaSWrapper;
    case BYOC_COMPONENT_RENDERING_NAME:
      return BYOCComponent;
    case BYOC_WRAPPER_RENDERING_NAME:
      return BYOCWrapper;
    default:
      console.error(
        `Unknown component ${componentRendering.componentName}. Ensure it's registered in componentFactory.js.`
      );
      return missingComponentComponent ?? MissingComponent;
  }
}

/**
 * Merges placeholder properties with specific rendering properties, including any styling or parameters provided by SXA.
 *
 * @param {PlaceholderProps} placeholderProps - Common properties and settings used across components.
 * @param {ComponentRendering} componentRendering - Specific rendering data for the component.
 * @param {Function} getSXAParams - A function that fetches additional parameters specific to SXA.
 * @returns {object} An object containing the combined properties for the component.
 */
function getFinalProps(
  placeholderProps: PlaceholderProps,
  componentRendering: ComponentRendering,
  getSXAParams: (rendering: ComponentRendering) => { styles?: string }
) {
  return {
    ...placeholderProps,
    ...((placeholderProps.fields || componentRendering.fields) && {
      fields: { ...placeholderProps.fields, ...componentRendering.fields },
    }),
    key: componentRendering.uid,
    ...((placeholderProps.params || componentRendering.params) && {
      params: {
        ...placeholderProps.params,
        ...componentRendering.params,
        ...getSXAParams(componentRendering),
      },
    }),
    rendering: componentRendering,
  };
}

/**
 * Constructs the data needed to render a component by combining rendering information, properties, and SXA parameters.
 * Returns a React JSX element ready for rendering.
 *
 * @param {ComponentRendering} rendering - The component rendering information.
 * @param {PlaceholderProps} placeholderProps - Placeholder properties that may include defaults or overrides for the component.
 * @param {Function} getComponentForRendering - A function to retrieve the React component based on the rendering information.
 * @param {Function} getSXAParams - A function that fetches additional parameters specific to SXA.
 * @returns {React.JSX.Element} A React element configured with the appropriate properties and component.
 */
function getRenderingData(
  rendering: ComponentRendering,
  placeholderProps: PlaceholderProps,
  getComponentForRendering: (rendering: ComponentRendering) => ComponentType | null,
  getSXAParams: (rendering: ComponentRendering) => { styles?: string }
): React.JSX.Element {
  const component = getRendering(
    rendering as ComponentRendering,
    getComponentForRendering,
    placeholderProps.hiddenRenderingComponent,
    placeholderProps.missingComponentComponent
  );

  const finalProps = getFinalProps(placeholderProps, rendering as ComponentRendering, getSXAParams);

  return React.createElement<{ [attr: string]: unknown }>(
    component as React.ComponentType,
    placeholderProps.modifyComponentProps
      ? placeholderProps.modifyComponentProps(finalProps)
      : finalProps
  );
}

/**
 * This component supports the chrome's hydration process in Pages by rendering the required metadata.
 * This component handles recursive rendering of components and their placeholders, encapsulating
 * each part within specific code tags to outline their structure and metadata attributes.
 *
 * @param {PlaceholderMetadataProps} props - The props containing the rendering data to render.
 * @returns {JSX.Element} - The rendered component with all nested components and placeholders.
 */
export const PlaceholderMetadata = ({
  rendering,
  placeholderProps,
  getComponentForRendering,
  getSXAParams,
}: PlaceholderMetadataProps): JSX.Element => {
  const getCodeBlockAttributes = (
    chromeType: string,
    kind: string,
    id: string,
    placeholderName?: string
  ): CodeBlockAttributes => {
    return {
      type: 'text/sitecore',
      chrometype: chromeType,
      className: 'scpm',
      kind: kind,
      id: placeholderName ? `${placeholderName}_${id}` : id,
    };
  };

  const renderComponent = (rendering: ComponentRendering): JSX.Element => {
    const componentToRender = getRenderingData(
      rendering,
      placeholderProps,
      getComponentForRendering,
      getSXAParams
    );
    return (
      <>
        <code {...getCodeBlockAttributes('rendering', 'open', rendering.uid)}></code>
        {componentToRender}
        <>
          {rendering.placeholders &&
            renderComponentsInPlaceholders(
              rendering.placeholders as { [key: string]: ComponentRendering[] },
              rendering.uid
            )}
        </>
        <code {...getCodeBlockAttributes('rendering', 'close', rendering.uid)}></code>
      </>
    );
  };

  const renderComponentsInPlaceholders = (
    placeholders: { [key: string]: ComponentRendering[] },
    parentUid: string
  ): JSX.Element[] => {
    return Object.entries(placeholders).flatMap(([key, nestedRendering]) => (
      <React.Fragment key={`${parentUid}-${key}`}>
        <code {...getCodeBlockAttributes('placeholder', 'open', parentUid, key)}></code>
        {nestedRendering.map(renderComponent)}
        <code {...getCodeBlockAttributes('placeholder', 'close', parentUid, key)}></code>
      </React.Fragment>
    ));
  };

  // Render based on whether there are any placeholders
  if (rendering.placeholders && Object.keys(rendering.placeholders).length > 0) {
    return (
      <>
        {Object.entries(rendering.placeholders).map(([placeholderName, nestedRenderings]) => (
          <React.Fragment key={`${rendering.uid}`}>
            {renderComponentsInPlaceholders(
              { [placeholderName]: nestedRenderings } as { [key: string]: ComponentRendering[] },
              rendering.uid
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return renderComponent(rendering);
  }
};
