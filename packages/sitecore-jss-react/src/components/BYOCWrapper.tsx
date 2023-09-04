import { BYOCComponentProps, BYOCComponent } from './BYOCComponent';
import React from 'react';

export const BYOC_WRAPPER_RENDERING_NAME = 'BYOCWrapper';

export const BYOCWrapper = (props: BYOCComponentProps): JSX.Element => {
  const styles = props.params?.styles?.trimEnd();
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={styles ? styles : undefined} id={id ? id : undefined}>
      <div className="component-content">
        <BYOCComponent {...props} />
      </div>
    </div>
  );
};
