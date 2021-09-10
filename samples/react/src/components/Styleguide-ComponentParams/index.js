import React from 'react';
import StyleguideSpecimen from '../Styleguide-Specimen';

const StyleguideComponentParams = (props) => {
  // props.params (i.e. props.params.cssClass without destructuring) contains the component's params
  const { cssClass, columns, useCallToAction } = props.params;

  const columnsArray = columns && [...Array(parseInt(columns))];

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-componentparams">
      <p className={cssClass}>
        The CSS class of this paragraph (<code>{cssClass}</code>) is set using a param
      </p>
      <div>
        {/* Note that all params come in as string values, like this boolean-like param here: */}
        useCallToAction param: <code>{useCallToAction}</code>
        <br />
        param type: <code>{typeof useCallToAction}</code>
        {useCallToAction === 'true' && (
          <div className="alert alert-info">the call to action is shown</div>
        )}
      </div>
      <p>columns param: {columns}</p>
      <div className="row">
        {columnsArray &&
          columnsArray.map((_, index) => (
            <div key={`col-${index}`} className="col-sm">
              Column {index}
            </div>
          ))}
      </div>
    </StyleguideSpecimen>
  );
};

export default StyleguideComponentParams;
