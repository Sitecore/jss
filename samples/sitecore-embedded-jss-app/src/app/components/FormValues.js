import React from 'react';

const FormValues = ({ formValues }) => (
  <table className="formValues">
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(formValues).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{formValues[key]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FormValues;
