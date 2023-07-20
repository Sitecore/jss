import PropTypes from 'prop-types';
import React from 'react';

export interface MissingComponentProps {
  rendering?: {
    componentName?: string;
  };
  errorOverride?: string;
}

export const MissingComponent: React.FC<MissingComponentProps> = (props) => {
  const componentName =
    props.rendering && props.rendering.componentName
      ? props.rendering.componentName
      : 'Unnamed Component';

  // error override would mean component is not unimplemented
  !props.errorOverride &&
    console.log(`Component props for unimplemented '${componentName}' component`, props);
  const errorMessage =
    props.errorOverride ||
    'JSS component is missing React implementation. See the developer console for more information.';
  return (
    <div
      style={{
        background: 'darkorange',
        outline: '5px solid orange',
        padding: '10px',
        color: 'white',
        maxWidth: '500px',
      }}
    >
      <h2>{componentName}</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

MissingComponent.propTypes = {
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

MissingComponent.displayName = 'MissingComponent';
