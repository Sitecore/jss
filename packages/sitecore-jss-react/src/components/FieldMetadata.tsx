import React from 'react';
import PropTypes from 'prop-types';

interface FieldMetadataProps {
  metadata: { [key: string]: unknown };
  children: React.ReactNode;
}

/**
 * The component which renders field metadata markup
 * @param {FieldMetadataProps} props the props of the component
 * @returns metadata markup wrapped around children
 */
export const FieldMetadata = (props: FieldMetadataProps): JSX.Element => {
  const data = JSON.stringify(props.metadata);
  const attributes = {
    type: 'text/sitecore',
    chrometype: 'field',
    className: 'scpm',
  };
  const codeOpenAttributes = { ...attributes, kind: 'open' };
  const codeCloseAttributes = { ...attributes, kind: 'close' };

  return (
    <>
      <code {...codeOpenAttributes}>{data}</code>
      {props.children}
      <code {...codeCloseAttributes}></code>
    </>
  );
};

FieldMetadata.displayName = 'FieldMetadata';

FieldMetadata.propTypes = {
  metadata: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
