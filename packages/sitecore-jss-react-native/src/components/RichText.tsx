import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export interface RichTextProps {
  [htmlViewProps: string]: unknown;
  /** The rich text field data. */
  field: {
    value?: string;
    editable?: string;
  } | null;
}

export const RichText: React.SFC<RichTextProps> = ({ field, ...otherProps }) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  const htmlValue = field.editable ? field.editable : field.value;

  return (
    <RenderHtml
      contentWidth={Dimensions.get('window').width}
      source={{ html: htmlValue }}
      {...otherProps}
    />
  );
};

RichText.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
};

RichText.displayName = 'RichText';
