import dynamic from 'next/dynamic';
import React from 'react';

type props = {
  children: React.ReactNode;
};

// This is a component when imported dynamically will not have any server side rendering.
// This is used as a workaround to prevent hydration errors when using SSR in Sitecore editors.
const NonSSRWrapper = ({ children }: props) => <React.Fragment>{children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
