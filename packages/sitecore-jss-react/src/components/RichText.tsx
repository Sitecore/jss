import React, { ForwardedRef, forwardRef, useMemo } from 'react';
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
    // Stabilize the object reference so React DOM does not rewrite innerHTML on every
    // parent re-render when the HTML string is unchanged (preserves DOM nodes / listeners).
    const html = field?.editable && editable ? field.editable : field?.value;
    const dangerouslySetInnerHTML = useMemo(
      () => (html != null && html !== '' ? { __html: html } : undefined),
      [html]
    );

    if (!field || (!field.editable && isFieldValueEmpty(field)) || !dangerouslySetInnerHTML) {
      return null;
    }

    const htmlProps = {
      dangerouslySetInnerHTML,
      ref,
      ...otherProps,
    };

    return React.createElement(tag || 'div', htmlProps);
  }
);

RichText.displayName = 'RichText';
