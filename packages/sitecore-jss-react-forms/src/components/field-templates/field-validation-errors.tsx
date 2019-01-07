import React from 'react';

export function FieldValidationErrors({ errors }: { errors: string[] }) {
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
