import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  rendering: ComponentRendering;
}

export type CodeBlockAttributes = {
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
 * @param {PlaceholderMetadataProps} props - The props containing the rendering data to render.
 * @returns {JSX.Element} - The rendered component with all nested components and placeholders.
 */
export const PlaceholderMetadata = ({ rendering }: PlaceholderMetadataProps): JSX.Element => {
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
    const ComponentName = rendering.componentName as React.ElementType;
    return (
      <>
        <code {...getCodeBlockAttributes('rendering', 'open', rendering.uid)}></code>
        <ComponentName>
          {rendering.placeholders &&
            renderComponentsInPlaceholders(
              rendering.placeholders as { [key: string]: ComponentRendering[] },
              rendering.uid
            )}
        </ComponentName>
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
