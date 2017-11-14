import React from 'react';

const FormValues = ({formValues}) =>
    <table className="formValues">
        {
            Object.keys(formValues).map((key) => {
                return <tr>
                    <td>{key}</td>
                    <td>{formValues[key]}</td>
                </tr>
            })
        }
    </table>

export default FormValues;