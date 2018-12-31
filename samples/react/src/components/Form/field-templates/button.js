import React from 'react';

function Button({ field }) {
  return (
    <React.Fragment>
      <button
        type="submit"
        value={field.model.title}
        name={field.buttonField.name}
        id={field.buttonField.id}
      >
        {field.model.title}
      </button>
    </React.Fragment>
  );
}

export default Button;
