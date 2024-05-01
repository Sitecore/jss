import React, { ReactNode } from 'react';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  uid: string;
  placeholderName?: string;
  children?: ReactNode;
}

export type CodeBlockAttributes = {
  type: string;
  chrometype: string;
  className: string;
  kind: string;
  id?: string;
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
}: PlaceholderMetadataProps): JSX.Element => {
  const getCodeBlockAttributes = (
    kind: string,
    id: string,
    placeholderName?: string
  ): CodeBlockAttributes => {
    const chrometype = placeholderName ? 'placeholder' : 'rendering';

    const attributes: CodeBlockAttributes = {
      type: 'text/sitecore',
      chrometype: chrometype,
      className: 'scpm',
      kind: kind,
    };

    if (kind === 'open') {
      attributes.id =
        chrometype === 'placeholder' && placeholderName ? `${placeholderName}_${id}` : id;
    }
    return attributes;
  };

  const renderComponent = (uid: string, placeholderName?: string) => (
    <>
      <code
        {...getCodeBlockAttributes('open', uid, placeholderName)}
        key={`open-${placeholderName}-${uid}`}
      />
      {children}
      <code
        {...getCodeBlockAttributes('close', uid, placeholderName)}
        key={`close-${placeholderName}-${uid}`}
      />
    </>
  );

  return <>{renderComponent(uid, placeholderName)}</>;
};
