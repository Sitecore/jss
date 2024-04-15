import React from 'react';
import PropTypes from 'prop-types';
import { FieldMetadata, getFieldMetadataMarkup } from './FieldMetadata';

export interface DateFieldProps {
  /** The date field data. */
  [htmlAttributes: string]: unknown;
  field: {
    value?: string;
    editable?: string;
  };
  /**
   * The HTML element that will wrap the contents of the field.
   */
  tag?: string;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   * @default true
   */
  editable?: boolean;
  render?: (date: Date | null) => React.ReactNode;
  /**
   * The field metadata; when present it should be exposed for chrome hydration process when rendering in Pages
   */
  metadata?: FieldMetadata;
}

export const DateField: React.FC<DateFieldProps> = ({
  field,
  tag,
  metadata,
  editable,
  render,
  ...otherProps
}) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  // when metadata is present, render it to be used for chrome hydration
  if (metadata) {
    return getFieldMetadataMarkup(metadata, otherProps.children);
  }

  let children: React.ReactNode;

  const htmlProps: {
    [htmlAttr: string]: unknown;
    children?: React.ReactNode;
  } = {
    ...otherProps,
  };

  if (field.editable && editable) {
    htmlProps.dangerouslySetInnerHTML = {
      __html: field.editable,
    };
  } else if (render) {
    children = render(field.value ? new Date(field.value) : null);
  } else {
    children = field.value;
  }

  if (tag || (field.editable && editable)) {
    return React.createElement(tag || 'span', htmlProps, children);
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

DateField.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
  }).isRequired,
  tag: PropTypes.string,
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
  editable: PropTypes.bool,
  render: PropTypes.func,
};

DateField.defaultProps = {
  editable: true,
};

DateField.displayName = 'Date';
