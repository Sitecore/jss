import React, { forwardRef } from 'react';

export interface RichTextField {
  value?: string;
  editable?: string;
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

export const RichText: React.FC<RichTextProps> = forwardRef(
  ({ field, tag, editable, ...otherProps }, ref) => {
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
);

RichText.displayName = 'RichText';
