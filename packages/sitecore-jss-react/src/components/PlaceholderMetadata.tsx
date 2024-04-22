import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  rendering: ComponentRendering;
}

export type CodeAttributesType = {
  type: string;
  chrometype: string;
  className: string;
  kind: string;
  id: string;
};

/**
 * This component supports the chrome's hydration process in Pages by rendering the required metadata.
 * This component handles recursive rendering of components and their placeholders, encapsulating
 * each part within specific code tags to outline their structure and metadata attributes.
 *
 * @param {PlaceholderMetadataProps} props - The props containing the component data to render.
 * @returns {JSX.Element} - The rendered component with all nested components and placeholders.
 */
export const PlaceholderMetadata = ({ component }: PlaceholderMetadataProps): JSX.Element => {
  const codeAttributes = (
    chromeType: string,
    kind: string,
    id: string,
    placeholderName?: string
  ): CodeAttributesType => {
    return {
      type: 'text/sitecore',
      chrometype: chromeType,
      className: 'scpm',
      kind: kind,
      id: placeholderName ? `${placeholderName}_${id}` : id,
    };
  };

  const renderRendering = (rendering: ComponentRendering): JSX.Element => {
    const ComponentName = component.componentName as React.ElementType;
    return (
      <>
        <code {...codeAttributes('rendering', 'open', component.uid)}></code>
        <ComponentName>
          {component.placeholders &&
            renderComponentsInPlaceholders(
              component.placeholders as { [key: string]: ComponentRendering[] },
              component.uid
            )}
        </ComponentName>
        <code {...codeAttributes('rendering', 'close', component.uid)}></code>
      </>
    );
  };

  const renderComponentsInPlaceholders = (
    placeholders: { [key: string]: ComponentRendering[] },
    parentUid: string
  ): JSX.Element[] => {
    return Object.entries(placeholders).flatMap(([key, nestedComponents]) => (
      <React.Fragment key={`${parentUid}-${key}`}>
        <code {...codeAttributes('placeholder', 'open', parentUid, key)}></code>
        {nestedComponents.map(renderComponent)}
        <code {...codeAttributes('placeholder', 'close', parentUid, key)}></code>
      </React.Fragment>
    ));
  };

  // Render based on whether there are any placeholders
  if (component.placeholders && Object.keys(component.placeholders).length > 0) {
    return (
      <>
        {Object.entries(component.placeholders).map(([placeholderName, nestedComponents]) => (
          <React.Fragment key={`${component.uid}`}>
            {renderComponentsInPlaceholders(
              { [placeholderName]: nestedComponents } as { [key: string]: ComponentRendering[] },
              component.uid
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return renderComponent(component);
  }
};
