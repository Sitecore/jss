import React from 'react';

function Section({ field, fieldFactory }) {
  return (
    <fieldset>
      <legend>{field.model.name}</legend>
      {field.fields.map(fieldFactory)}
    </fieldset>
  );
}

export default Section;
