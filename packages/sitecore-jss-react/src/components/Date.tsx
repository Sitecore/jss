import React from 'react';
import PropTypes from 'prop-types';
import { withFieldMetadata, FieldMetadataPropTypes } from '../enhancers/withFieldMetadata';
import { FieldMetadataValue } from '@sitecore-jss/sitecore-jss/layout';

export interface DateFieldProps {
  /** The date field data. */
  [htmlAttributes: string]: unknown;
  field: {
    value?: string;
    editable?: string;
    metadata?: FieldMetadataValue;
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
}

export const DateField: React.FC<DateFieldProps> = withFieldMetadata(
  ({ field, tag, editable, render, ...otherProps }) => {
    if (!field || (!field.editable && !field.value)) {
      return null;
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
  }
);

DateField.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
    metadata: FieldMetadataPropTypes,
  }).isRequired,
  tag: PropTypes.string,
  editable: PropTypes.bool,
  render: PropTypes.func,
};

DateField.defaultProps = {
  editable: true,
};

DateField.displayName = 'Date';
