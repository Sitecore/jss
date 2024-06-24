import React from 'react';
import PropTypes from 'prop-types';
import { withFieldMetadata } from '../enhancers/withFieldMetadata';
import { withEmptyValueEditingPlaceholder } from '../enhancers/withEmptyValueEditingPlaceholder';
import { DefaultEmptyFieldEditingComponentText } from './DefaultEmptyFieldEditingComponents';

export interface DateFieldProps {
  /** The date field data. */
  [htmlAttributes: string]: unknown;
  field: {
    value?: string;
    editable?: string;
    metadata?: { [key: string]: unknown };
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
   * -- Edit Mode Metadata --
   *
   * Custom element to render in Pages in Metadata edit mode if field value is empty
   */
  emptyValueEditingPlaceholder?: React.ComponentClass | React.FC;
}

export const DateField: React.FC<DateFieldProps> = withFieldMetadata<DateFieldProps>(
  withEmptyValueEditingPlaceholder<DateFieldProps>(
    ({ field, tag, editable = true, render, ...otherProps }) => {
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
    },
    DefaultEmptyFieldEditingComponentText
  )
);

DateField.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    editable: PropTypes.string,
    metadata: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  tag: PropTypes.string,
  editable: PropTypes.bool,
  render: PropTypes.func,
};

DateField.displayName = 'Date';
