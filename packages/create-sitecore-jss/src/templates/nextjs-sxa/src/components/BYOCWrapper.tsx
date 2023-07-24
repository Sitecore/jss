import { BYOCProps, BYOCRenderer } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

export const Default = (props: BYOCProps): JSX.Element => {
  const styles = props.params?.styles?.trimEnd();
  const id = props.params?.RenderingIdentifier;
  const rendererProps = {
    components: FEAAS.External.registered,
    ...props,
  };
  return (
    <div className={styles ? styles : undefined} id={id ? id : undefined}>
      <div className="component-content">
        <BYOCRenderer {...rendererProps} />
      </div>
    </div>
  );
};
