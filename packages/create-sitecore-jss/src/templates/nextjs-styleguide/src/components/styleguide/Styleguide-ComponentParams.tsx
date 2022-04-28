import StyleguideSpecimen from './Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideComponentParamsProps = ComponentProps &
  StyleguideSpecimenFields & {
    params: {
      cssClass: string;
      columns: string;
      useCallToAction: 'false' | 'true';
    };
  };

const StyleguideComponentParams = (props: StyleguideComponentParamsProps): JSX.Element => {
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
