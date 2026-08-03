import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { withFieldMetadata } from '../enhancers/withFieldMetadata';
import { withEmptyFieldEditingComponent } from '../enhancers/withEmptyFieldEditingComponent';
import { DefaultEmptyFieldEditingComponentText } from './DefaultEmptyFieldEditingComponents';
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
    const html = field && (field.editable && editable ? field.editable : field.value);

    // Keep the object reference stable across re-renders when the html is unchanged,
    // since React DOM compares dangerouslySetInnerHTML by reference and re-sets
    // innerHTML (recreating all child DOM nodes) whenever it changes.
    const dangerouslySetInnerHTML = useMemo(() => ({ __html: html }), [html]);
    
    if (!field || (!field.editable && isFieldValueEmpty(field))) {
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
