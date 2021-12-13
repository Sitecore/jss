import React, { useContext } from 'react';
import {
  Placeholder as ReactPlaceholder,
  PlaceholderComponentProps,
} from '@sitecore-jss/sitecore-jss-react';
import { ComponentPropsReactContext } from './ComponentPropsContext';

export const Placeholder = (props: PlaceholderComponentProps) => {
  const componentPropsContext = useContext(ComponentPropsReactContext);

  return (
    <ReactPlaceholder
      {...props}
      modifyComponentProps={(initialProps) => {
        if (!initialProps.rendering.uid) return initialProps;

        const data = componentPropsContext[initialProps.rendering.uid] as { [key: string]: unknown };

        return { ...initialProps, ...data };
      }}
    />
  );
};
