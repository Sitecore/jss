import Image from 'next/image';
import * as FEAAS from '@sitecore-feaas/clientside/react';

// Element implementations for Sitecore Component Builder can be overriden here

const FEAASElementOverrides = (): JSX.Element => {
  // Register next Image to be used in Component Builder.
  // Nextjs image implementation will be used when img is rendered in component from Component Builder
  FEAAS.setElementImplementation('img', (attributes: Record<string, string>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, src, alt, ...imgAttributes } = attributes;
    return <Image height={1920} width={1200} src={src} alt={alt} {...imgAttributes} />;
  });

  return <></>;
};

export default FEAASElementOverrides;
