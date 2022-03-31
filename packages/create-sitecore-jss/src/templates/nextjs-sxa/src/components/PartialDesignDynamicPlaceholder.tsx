import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentRendering, RouteData } from '@sitecore-jss/sitecore-jss/layout';

type DynamicPlaceholderProps = {
  rendering: ComponentRendering | RouteData;
};

const PartialDesignDynamicPlaceholder = (props: DynamicPlaceholderProps): JSX.Element => (
  <Placeholder name={props.rendering.params.sig} rendering={props.rendering} />
);

export default PartialDesignDynamicPlaceholder;
