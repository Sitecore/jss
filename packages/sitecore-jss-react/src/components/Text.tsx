import React, { ReactElement, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

export interface TextProps {
  [htmlAttributes: string]: unknown;
  /** The text field data. */
  field?: {
    value?: string | number;
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
  /**
   * If false, HTML-encoding of the field value is disabled and the value is rendered as-is.
   */
  encode?: boolean;
}

export const Text: FunctionComponent<TextProps> = ({
  field,
  tag,
  editable,
  encode,
  ...otherProps
}) => {
  if (!field || (!field.editable && (field.value === undefined || field.value === ''))) {
    return null;
  }

  console.log('LOG VALUES FOR <TEXT/> component:', field);

  // can't use editable value if we want to output unencoded
  if (!encode) {
    // eslint-disable-next-line no-param-reassign
    editable = false;
  }

  const isEditable = field.editable && editable;

  let output: string | number | (ReactElement | string)[] = isEditable
    ? field.editable || ''
    : field.value === undefined
    ? ''
    : field.value;

  // when string value isn't formatted, we should format line breaks
  if (!field.editable && typeof output === 'string') {
    const splitted = String(output).split('\n');

    if (splitted.length) {
      const formatted: (ReactElement | string)[] = [];

      splitted.forEach((str, i) => {
        const isLast = i === splitted.length - 1;

        formatted.push(str);

        if (!isLast) {
          formatted.push(<br key={i} />);
        }
      });

      output = formatted;
    }
  }

  const setDangerously = isEditable || !encode;

  let children = null;
  const htmlProps: {
    [htmlAttributes: string]: unknown;
    children?: React.ReactNode;
  } = {
    ...otherProps,
  };

  if (setDangerously) {
    htmlProps.dangerouslySetInnerHTML = {
      __html: output,
    };
  } else {
    children = output;
  }

  if (tag || setDangerously) {
    return React.createElement(tag || 'span', htmlProps, children);
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

Text.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editable: PropTypes.string,
  }),
  tag: PropTypes.string,
  editable: PropTypes.bool,
  encode: PropTypes.bool,
};

Text.defaultProps = {
  editable: true,
  encode: true,
};

Text.displayName = 'Text';
