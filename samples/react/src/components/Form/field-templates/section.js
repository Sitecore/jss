import React from 'react';

function Section({ field, fieldFactory }) {
  return (
    <fieldset>
      <legend>{field.model.name}</legend>
      {field.fields.map((childField) =>
        fieldFactory(childField, { field: childField, key: field.model.itemId })
      )}
    </fieldset>
  );
}

export default Section;
