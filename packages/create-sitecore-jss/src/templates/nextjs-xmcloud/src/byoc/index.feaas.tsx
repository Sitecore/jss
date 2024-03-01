import Image from 'next/image';
import * as FEAAS from '@sitecore-feaas/clientside/react';

// Element implementations for Sitecore Component Builder can be overriden here

// Register next Image to be used in Component Builder.
// Nextjs image implementation will be used when img is rendered in component from Component Builder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
FEAAS.setElementImplementation('img', (attributes: any) => {
  delete attributes.children;
  return <Image {...attributes} />;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
