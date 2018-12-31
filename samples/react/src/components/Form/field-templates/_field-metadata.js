import React from 'react';

function FieldMetadata({ field }) {
  if (!field || !field.fieldIdField || !field.indexField) {
    return null;
  }

  return (
    <React.Fragment>
      <input
        type="hidden"
        id={field.indexField.id}
        name={field.indexField.name}
        value={field.indexField.value}
      />
      <input
        type="hidden"
        id={field.fieldIdField.id}
        name={field.fieldIdField.name}
        value={field.fieldIdField.value}
      />
    </React.Fragment>
  );
}

export default FieldMetadata;
