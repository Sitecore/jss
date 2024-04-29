import React, { ReactNode } from 'react';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  uid: string;
  placeholderName?: string;
  children?: ReactNode;
  metadataType?: string;
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
  uid,
  placeholderName,
  children,
  metadataType,
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

  const renderComponent = (uid: string, metadataType: string, placeholderName?: string) => {
    if (metadataType) {
      return (
        <>
          <code
            {...getCodeBlockAttributes(metadataType, 'open', uid, placeholderName)}
            key={`open-${placeholderName}-${uid}`}
          />
          {children}
          <code
            {...getCodeBlockAttributes(metadataType, 'close', uid, placeholderName)}
            key={`close-${placeholderName}-${uid}`}
          />
        </>
      );
    } else {
      return <>{children}</>;
    }
  };

  return <>{renderComponent(uid, metadataType, placeholderName)}</>;
};
