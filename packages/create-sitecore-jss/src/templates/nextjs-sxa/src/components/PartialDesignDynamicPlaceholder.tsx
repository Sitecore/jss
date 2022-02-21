import React from 'react';
import {
  Placeholder
} from '@sitecore-jss/sitecore-jss-nextjs';

const PartialDesignDynamicPlaceholder = (props: any): JSX.Element => {
  return (
    <Placeholder name={props.rendering.params.sig} rendering={props.rendering} />
  );
};

export default PartialDesignDynamicPlaceholder;
