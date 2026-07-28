import React, { ForwardedRef, forwardRef } from 'react';
import { EditableFieldProps } from './sharedTypes';
import { isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';

export interface RichTextField {
  value?: string;
  editable?: string;
}

export interface RichTextProps extends EditableFieldProps {
  [htmlAttributes: string]: unknown;
  /** The rich text field data. */
  field?: RichTextField;
  /**
   * The HTML element that will wrap the contents of the field.
   * @default <div />
   */
  tag?: string;
}

export const RichText = forwardRef(
  (
    { field, tag = 'div', editable = true, ...otherProps }: RichTextProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    if (!field || (!field.editable && isFieldValueEmpty(field))) {
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
