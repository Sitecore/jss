import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withFieldMetadata } from '../enhancers/withFieldMetadata';

export interface RichTextField {
  value?: string;
  editable?: string;
  metadata?: { [key: string]: unknown };
}

export interface RichTextProps {
  [htmlAttributes: string]: unknown;
  /** The rich text field data. */
  field?: RichTextField;
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

export const RichText: React.FC<RichTextProps> = withFieldMetadata<RichTextProps>(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLElement, RichTextProps>(
    ({ field, tag = 'div', editable = true, ...otherProps }, ref) => {
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
    }
  ),
  true
);

export const RichTextPropTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
    metadata: PropTypes.objectOf(PropTypes.any),
  }),
  tag: PropTypes.string,
  editable: PropTypes.bool,
};

RichText.propTypes = RichTextPropTypes;

RichText.displayName = 'RichText';
