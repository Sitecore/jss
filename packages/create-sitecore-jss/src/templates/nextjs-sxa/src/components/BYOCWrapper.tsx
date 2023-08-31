import { BYOCComponentProps, BYOCComponent } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

export const Default = (props: BYOCComponentProps): JSX.Element => {
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
