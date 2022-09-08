import dynamic from 'next/dynamic';
import React from 'react';

type props = {
  children: React.ReactNode;
};

const NonSSRWrapper = ({ children }: props) => <React.Fragment>{children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
