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
 * A React component to generate metadata blocks for a placeholder or rendering.
 * It utilizes dynamic attributes based on whether the component acts as a placeholder
 * or as a rendering to properly render the surrounding code blocks.
 *
 * @param {object} props The properties passed to the component.
 * @param {string} props.uid A unique identifier for the component instance.
 * @param {string} [props.placeholderName] The name of the placeholder.
 * @param {JSX.Element} props.children The child components or elements to be wrapped by the metadata code blocks.
 * @returns {JSX.Element} A React fragment containing open and close code blocks surrounding the children elements.
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
