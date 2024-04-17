import PropTypes from 'prop-types';
import React from 'react';
import { withFieldMetadata, FieldMetadataPropTypes } from '../enhancers/withFieldMetadata';
import { FieldMetadata } from '@sitecore-jss/sitecore-jss/utils';

export interface FileFieldValue {
  [propName: string]: unknown;
  src?: string;
  title?: string;
  displayName?: string;
}

export interface FileField {
  value: FileFieldValue;
  metadata?: FieldMetadata;
}

export interface FileProps {
  [attributeName: string]: unknown;
  /** The file field data. */
  field: FileFieldValue | FileField;
  /** HTML attributes that will be appended to the rendered <a /> tag. */
  children?: React.ReactNode;
}

export const File: React.FC<FileProps> = withFieldMetadata(({ field, children, ...otherProps }) => {
  /*
    File fields cannot be managed via the EE. We never output "editable."
    */

  const dynamicField: FileField | FileFieldValue = field;

  if (!field || (!dynamicField.value && !(dynamicField as FileFieldValue).src)) {
    return null;
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
});

File.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      metadata: FieldMetadataPropTypes,
    }),
  ]).isRequired,
};

File.displayName = 'File';
