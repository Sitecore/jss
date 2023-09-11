import { FEaaSComponent, FEaaSComponentProps } from './FEaaSComponent';
import React from 'react';

export const FEAAS_WRAPPER_RENDERING_NAME = 'FEaaSWrapper';

export const FEaaSWrapper = (props: FEaaSComponentProps): JSX.Element => {
  const styles = `component feaas ${props.params?.styles}`.trimEnd();
  const id = props.params?.RenderingIdentifier;
  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <FEaaSComponent {...props} />
      </div>
    </div>
  );
};
