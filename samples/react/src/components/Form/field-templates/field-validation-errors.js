import React from 'react';

function FieldValidationErrors({ errors }) {
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
}

export default FieldValidationErrors;
