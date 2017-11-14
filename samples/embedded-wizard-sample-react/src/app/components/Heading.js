import React from 'react';

const Heading = ({fields}) =>
    <h2 dangerouslySetInnerHTML={{__html: fields.text.editable}} />

export default Heading;