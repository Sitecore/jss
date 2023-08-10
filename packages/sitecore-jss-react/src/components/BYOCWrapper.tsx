import { BYOCProps, BYOCRenderer } from './BYOCRenderer';
import React from 'react';

export const BYOC_WRAPPER_RENDERING_NAME = 'BYOCWrapper';

export const BYOCWrapper = (props: BYOCProps): JSX.Element => {
  const styles = props.params?.styles?.trimEnd();
  const id = props.params?.RenderingIdentifier;
  return (
    <div className={styles ? styles : undefined} id={id ? id : undefined}>
      <div className="component-content">
        <BYOCRenderer {...props} />
      </div>
    </div>
  );
};
