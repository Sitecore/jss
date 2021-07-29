import React from 'react';
import { LabelProps } from '../../FieldProps';

const Label: React.FunctionComponent<LabelProps> = (props) => {
  if (props.labelComponent) {
    const CustomLabel = props.labelComponent;

    // strip the label component from the custom component props
    // (prevents infinite loop rendering if someone reuses this component as a custom label component)
    // eslint-disable-next-line no-unused-vars
    const { labelComponent, ...labelComponentProps } = props;

    return <CustomLabel {...labelComponentProps} />;
  }

  const { field, isValid, children } = props;

  let className = field.model.labelCssClass;

  if (!isValid) {
    className += ' invalid';
  }

  return (
    <label htmlFor={field.valueField.id} className={className}>
      {children}
      {field.model.title}
    </label>
  );
};

export { Label };
