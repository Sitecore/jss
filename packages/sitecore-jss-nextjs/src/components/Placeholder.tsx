import React, { useContext } from 'react';
import {
  Placeholder as ReactPlaceholder,
  PlaceholderComponentProps,
} from '@sitecore-jss/sitecore-jss-react';
import { ComponentPropsReactContext } from './ComponentPropsContext';
import { ComponentProps } from '@sitecore-jss/sitecore-jss-react/types/components/PlaceholderCommon';

export const Placeholder = (props: PlaceholderComponentProps) => {
  const componentPropsContext = useContext(ComponentPropsReactContext);

  function getContextProps(initialProps: ComponentProps) {
    if (!initialProps.rendering.uid) return initialProps;

    const data = componentPropsContext[initialProps.rendering.uid] as {
      [key: string]: unknown;
    };

    return data;
  }

  return (
    <ReactPlaceholder
      {...props}
      modifyComponentProps={(initialProps) => {
        const finalProps = props.modifyComponentProps
          ? props.modifyComponentProps(initialProps)
          : initialProps;
        return { ...finalProps, ...getContextProps(initialProps) };
      }}
    />
  );
};
