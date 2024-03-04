import Image from 'next/image';
import * as FEAAS from '@sitecore-feaas/clientside/react';

// Element implementations for Sitecore Component Builder can be overriden here

// type to adjust HTMLAttributes to nextjs Image attributes
type ImageProps = {
  src: string;
  alt: string;
} & React.HTMLAttributes<HTMLImageElement>;

// Register next Image to be used in Component Builder.
// Nextjs image implementation will be used when img is rendered in component from Component Builder
FEAAS.setElementImplementation('img', (attributes: ImageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...imgAttributes } = attributes;
  return <Image height={1920} width={1200} {...imgAttributes} />;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
