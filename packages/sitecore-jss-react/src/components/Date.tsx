import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

export interface DateFieldProps {
  /** The date field data. */
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
  render?: (date: Date | null) => React.ComponentType<any>;
  [htmlAttributes: string]: any;
}

export const DateField: React.SFC<DateFieldProps> = ({ field, tag, editable, render, ...otherProps }: DateFieldPropTypes) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  let children: any;

  const htmlProps: any = {
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

const dateFieldPropTypes = {
  field: PropTypes.shape({
    value: PropTypes.any,
    editable: PropTypes.string,
  }),
  tag: PropTypes.string,
  editable: PropTypes.bool,
  render: PropTypes.func,
};

type DateFieldPropTypes = InferProps<typeof dateFieldPropTypes>;

DateField.defaultProps = {
  editable: true,
};

DateField.displayName = 'Date';
