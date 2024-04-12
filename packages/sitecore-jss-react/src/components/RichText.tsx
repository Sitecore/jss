import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  FieldMetadata,
  FieldMetadataComponent,
  FieldMetadataComponentProps,
} from './FieldMetadata';

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
  /**
   * The field metadata; when present it should be exposed for chrome hydration process when rendering in Pages
   */
  metadata?: FieldMetadata;
}

export const RichText: React.FC<RichTextProps> = forwardRef(
  ({ field, tag, editable, ...otherProps }, ref) => {
    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // when metadata is present, render it to be used for chrome hydration
    if (otherProps.metadata) {
      const props: FieldMetadataComponentProps = {
        data: JSON.stringify(otherProps.metadata),
      };

      return <FieldMetadataComponent {...props}>{otherProps.children}</FieldMetadataComponent>;
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

export const RichTextPropTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }),
  tag: PropTypes.string,
  editable: PropTypes.bool,
  metadata: PropTypes.shape({
    contextItem: PropTypes.shape({
      id: PropTypes.string,
      language: PropTypes.string,
      revision: PropTypes.string,
      version: PropTypes.number,
    }),
    fieldId: PropTypes.string,
    fieldType: PropTypes.string,
    rawValue: PropTypes.string,
  }),
};

RichText.propTypes = RichTextPropTypes;

RichText.defaultProps = {
  tag: 'div',
  editable: true,
};

RichText.displayName = 'RichText';
