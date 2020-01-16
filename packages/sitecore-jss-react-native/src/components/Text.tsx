import React from 'react';
import PropTypes from 'prop-types';
import { Text as NativeText } from 'react-native';

export interface TextProps {
  /** The text field data. */
  field: {
    value?: string;
    editable?: string;
  } | null;
  [nativeTextProps: string]: any;
}

export const Text: React.SFC<TextProps> = ({ field, ...otherProps }) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  const textValue = field.editable ? field.editable : field.value;

  return <NativeText {...otherProps}>{textValue}</NativeText>;
};

Text.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.any,
    editable: PropTypes.string,
  }),
};

Text.displayName = 'Text';
