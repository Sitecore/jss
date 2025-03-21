import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes, { Requireable } from 'prop-types';
import { withFieldMetadata } from '../enhancers/withFieldMetadata';
import { withEmptyFieldEditingComponent } from '../enhancers/withEmptyFieldEditingComponent';
import { DefaultEmptyFieldEditingComponentText } from './DefaultEmptyFieldEditingComponents';
import { EditableFieldProps } from './sharedTypes';
import { FieldMetadata, isFieldValueEmpty } from '@sitecore-jss/sitecore-jss/layout';

export interface RichTextField extends FieldMetadata {
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

export const RichText: React.FC<RichTextProps> = withFieldMetadata<RichTextProps>(
  withEmptyFieldEditingComponent<RichTextProps>(
    // eslint-disable-next-line react/display-name
    forwardRef(
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
    ),
    { defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentText, isForwardRef: true }
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
  emptyFieldEditingComponent: PropTypes.oneOfType([
    PropTypes.object as Requireable<React.ComponentClass<unknown>>,
    PropTypes.func as Requireable<React.FC<unknown>>,
  ]),
};

RichText.propTypes = RichTextPropTypes;

RichText.displayName = 'RichText';
