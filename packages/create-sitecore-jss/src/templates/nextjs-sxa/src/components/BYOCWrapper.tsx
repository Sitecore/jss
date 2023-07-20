import { BYOCProps, BYOCRenderer } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

export const Default = (props: BYOCProps): JSX.Element => {
  const rendererProps = {
    components: FEAAS.External.registered,
    ...props,
  };
  return (
    <div className="component-content">
      <BYOCRenderer {...rendererProps} />
    </div>
  );
};
