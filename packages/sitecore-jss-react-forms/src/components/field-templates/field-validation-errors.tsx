import React from 'react';
import { LabelProps } from '../../FieldProps';

const FieldValidationErrors: React.FunctionComponent<LabelProps> = (props) => {
  if (props.fieldValidationErrorsComponent) {
    const CustomError = props.fieldValidationErrorsComponent;

    // strip the errors component from the custom component props
    // (prevents infinite loop rendering if someone reuses this component as a custom error component)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fieldValidationErrorsComponent, ...errorsComponentProps } = props;

    return <CustomError {...errorsComponentProps} />;
  }

  const { errors } = props;

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="invalid">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export { FieldValidationErrors };
