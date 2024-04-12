import PropTypes from 'prop-types';
import React from 'react';
import {
  FieldMetadata,
  FieldMetadataComponent,
  FieldMetadataComponentProps,
} from './FieldMetadata';

export interface FileFieldValue {
  [propName: string]: unknown;
  src?: string;
  title?: string;
  displayName?: string;
}

export interface FileField {
  value: FileFieldValue;
}

export interface FileProps {
  [attributeName: string]: unknown;
  /** The file field data. */
  field: FileFieldValue | FileField;
  /** HTML attributes that will be appended to the rendered <a /> tag. */
  children?: React.ReactNode;
  /**
   * The field metadata; when present it should be exposed for chrome hydration process when rendering in Pages
   */
  metadata?: FieldMetadata;
}

export const File: React.FC<FileProps> = ({ field, children, metadata, ...otherProps }) => {
  /*
    File fields cannot be managed via the EE. We never output "editable."
  */

  const dynamicField: FileField | FileFieldValue = field;

  if (!field || (!dynamicField.value && !(dynamicField as FileFieldValue).src)) {
    return null;
  }

  // when metadata is present, render it to be used for chrome hydration
  if (metadata) {
    const props: FieldMetadataComponentProps = {
      data: JSON.stringify(metadata),
    };

    return <FieldMetadataComponent {...props}>{otherProps.children}</FieldMetadataComponent>;
  }

  // handle link directly on field for forgetful devs
  const file = ((dynamicField as FileFieldValue).src
    ? field
    : dynamicField.value) as FileFieldValue;
  if (!file) {
    return null;
  }

  const linkText = !children ? file.title || file.displayName : null;
  const anchorAttrs = {
    href: file.src,
  };
  return React.createElement('a', { ...anchorAttrs, ...otherProps }, linkText, children);
};

File.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
    }),
  ]).isRequired,
  metadata: PropTypes.shape({
    contextItem: PropTypes.shape({
      id: PropTypes.string,
      language: PropTypes.string,
      revision: PropTypes.string,
      version: PropTypes.number,
    }),
    fieldId: PropTypes.string,
    fieldType: PropTypes.string,
    rawValue: PropTypes.string,
  }),
};

File.displayName = 'File';
