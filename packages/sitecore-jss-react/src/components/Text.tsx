import React, { ReactElement, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

export interface TextProps {
  /** The text field data. */
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
  /**
   * If false, HTML-encoding of the field value is disabled and the value is rendered as-is.
   */
  encode?: boolean;
  [htmlAttributes: string]: any;
}

export const Text: FunctionComponent<TextProps> = ({ field, tag, editable, encode, ...otherProps }) => {
  if (!field || (!field.editable && !field.value)) {
    return null;
  }

  // can't use editable value if we want to output unencoded
  if (!encode) {
    // eslint-disable-next-line no-param-reassign
    editable = false;
  }

  const value = (field.editable && editable ? field.editable : field.value) || '';

  let output: (ReactElement | string)[] = [value];

  // when value isn't formatted, we should format line breaks
  if (!field.editable && value) {
    const splitted = value.split('\n');

    splitted.forEach((str, i) => {
      const isLast = i === splitted.length - 1;

      output.push(str);

      if (!isLast) {
        output.push(<br key={i}/>);
      }
    });
  }

  const setDangerously = (field.editable && editable) || !encode;

  let children = null;
  const htmlProps: any = {
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
    value: PropTypes.any,
    editable: PropTypes.string,
  }).isRequired,
  tag: PropTypes.string,
  editable: PropTypes.bool,
  encode: PropTypes.bool,
};

Text.defaultProps = {
  editable: true,
  encode: true,
};

Text.displayName = 'Text';