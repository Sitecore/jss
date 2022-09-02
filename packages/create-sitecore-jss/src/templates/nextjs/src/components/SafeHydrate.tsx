import dynamic from 'next/dynamic';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NonSSRWrapper = (props: any) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
