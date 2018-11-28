import PropTypes from 'prop-types';
import React from 'react';

export interface FileFieldValue {
  src?: string;
  title?: string;
  displayName?: string;
  [propName: string]: any;
}

export interface FileField {
  value: FileFieldValue;
}

export interface FileProps {
  /** The file field data. */
  field: FileFieldValue | FileField;
  /** HTML attributes that will be appended to the rendered <a /> tag. */
  [attributeName: string]: any;
}

export const File: React.SFC<FileProps> = ({ field, children, ...otherProps }) => {
  /*
    File fields cannot be managed via the EE. We never output "editable."
  */

  const dynamicField: any = field;

  if (!field || (!dynamicField.value && !dynamicField.src)) {
    return null;
  }

  // handle link directly on field for forgetful devs
  const file = dynamicField.src ? field : dynamicField.value;
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
  ]),
};

File.displayName = 'File';
