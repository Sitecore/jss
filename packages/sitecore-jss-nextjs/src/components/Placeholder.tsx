import React, { useContext } from 'react';
import {
  Placeholder as ReactPlaceholder,
  PlaceholderComponentProps,
  WithSitecoreContextProps,
  EnhancedOmit,
} from '@sitecore-jss/sitecore-jss-react';
import { ComponentPropsReactContext } from './ComponentPropsContext';

/**
 * React Placeholder component wrapped by withSitecoreContext, so these properties shouldn't be passed to the Next.js Placeholder.
 */
type PlaceholderProps = EnhancedOmit<PlaceholderComponentProps, keyof WithSitecoreContextProps>;

export const Placeholder = (props: PlaceholderProps) => {
  const componentPropsContext = useContext(ComponentPropsReactContext);

  return (
    <ReactPlaceholder
      {...props}
      modifyComponentProps={(initialProps) => {
        if (!initialProps.rendering.uid) return initialProps;

        const data = componentPropsContext[initialProps.rendering.uid] as {
          [key: string]: unknown;
        };

        return { ...initialProps, ...data };
      }}
    />
  );
};
