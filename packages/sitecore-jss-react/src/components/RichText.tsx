import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export interface RichTextProps {
  [htmlAttributes: string]: unknown;
  /** The rich text field data. */
  field?: {
    value?: string;
    editable?: string;
  };
  /**
   * The HTML element that will wrap the contents of the field.
   * @default <div />
   */
  tag?: string;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   * @default true
   */
  editable?: boolean;
}

export const RichText: React.SFC<RichTextProps> = forwardRef(({ field, tag, editable, ...otherProps }, ref) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  const htmlProps = {
    dangerouslySetInnerHTML: {
      __html: field.editable && editable ? field.editable : field.value,
    },
    ref,
    ...otherProps,
  };

  return React.createElement(tag || 'div', htmlProps);
});

export const RichTextPropTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  tag: PropTypes.string,
  editable: PropTypes.bool,
};

RichText.propTypes = RichTextPropTypes;

RichText.defaultProps = {
  tag: 'div',
  editable: true,
};

RichText.displayName = 'RichText';
