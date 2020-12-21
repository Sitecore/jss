import React from 'react';
import { ErrorComponentProps } from '..';

const DefaultError = (props: ErrorComponentProps) => (
  <div className="form-errors">
    {props.formErrors.map((error, index) => (
      <div className="invalid" key={`formError-${index}`}>
        {error}
      </div>
    ))}
    {props.fieldErrors.map((error, index) => (
      <div className="invalid" key={`fieldError-${index}`}>
        {error.state.errors.map((message) => (
          <div key={message}>{message}</div>
        ))}
      </div>
    ))}
  </div>
);

export { DefaultError };
