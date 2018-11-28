import React from 'react';
import HtmlView from 'react-native-htmlview';
import PropTypes from 'prop-types';

export interface RichTextProps {
  /** The rich text field data. */
  field: {
    value?: string;
    editable?: string;
  } | null;
  [htmlViewProps: string]: any;
}

export const RichText: React.SFC<RichTextProps> = ({ field, ...otherProps }) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  const htmlValue: any = field.editable ? field.editable : field.value;

  return <HtmlView value={htmlValue} {...otherProps} />;
};

RichText.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
};

RichText.displayName = 'RichText';
