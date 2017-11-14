import React from 'react';

/* Only ever rendered in Editing Mode */
const StepReference = ({ fields }) =>
    <li style={{paddingBottom: '20px'}}>
        Name: <span dangerouslySetInnerHTML={{__html: fields.stepName.editable }} />
        &nbsp;/&nbsp;
        Route: <span dangerouslySetInnerHTML={{__html: fields.stepLink.editable }} />
    </li>

export default StepReference;