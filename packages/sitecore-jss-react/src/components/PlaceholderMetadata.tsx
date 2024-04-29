import React, { ReactNode } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  rendering: ComponentRendering;
  children?: ReactNode;
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
export const PlaceholderMetadata = ({
  rendering,
  children,
}: PlaceholderMetadataProps): JSX.Element => {
  const getCodeBlockAttributes = (
    chromeType: string,
    kind: string,
    id: string
  ): CodeBlockAttributes => {
    return {
      type: 'text/sitecore',
      chrometype: chromeType,
      className: 'scpm',
      kind: kind,
      id,
    };
  };

  const renderComponent = (rendering: ComponentRendering, parentId = '') => {
    const result = [];
    const currentId = parentId ? `${parentId}_${rendering.uid}` : rendering.uid;

    if (rendering.placeholders && Object.values(rendering.placeholders).length > 0) {
      Object.entries(rendering.placeholders).forEach(([key, nestedRenderings]) => {
        const placeholderId = `${key}_${currentId}`;

        result.push(
          <code
            {...getCodeBlockAttributes('placeholder', 'open', placeholderId)}
            key={`open-placeholder-${placeholderId}`}
          ></code>
        );

        nestedRenderings.forEach((nestedRendering) => {
          result.push(...renderComponent(nestedRendering as ComponentRendering, placeholderId));
        });

        result.push(
          <code
            {...getCodeBlockAttributes('placeholder', 'close', placeholderId)}
            key={`close-placeholder-${placeholderId}`}
          ></code>
        );
      });
    } else {
      result.push(
        <code
          {...getCodeBlockAttributes('rendering', 'open', rendering.uid)}
          key={`open-rendering-${rendering.uid}`}
        ></code>
      );

      result.push(children);

      result.push(
        <code
          {...getCodeBlockAttributes('rendering', 'close', rendering.uid)}
          key={`close-rendering-${rendering.uid}`}
        ></code>
      );
    }

    return result;
  };

  return <React.Fragment>{renderComponent(rendering)}</React.Fragment>;
};
