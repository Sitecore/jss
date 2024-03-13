import Image from 'next/image';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import nextConfig from 'next.config';
// Element implementations for Sitecore Component Builder can be overriden here

const FEAASScripts = (): JSX.Element => {
  // we cannot use nextjs's logic for remotePatterns matching without extra dependencies
  // so we use a limited approach for now - which will be replaced once nextjs allows to fall back to unoptimized OOB
  const shouldOptimize = (src: string) => {
    if (src.startsWith('http')) {
      const url = new URL(src);
      const domains: string[] = nextConfig().images?.domains || [];
      return (
        domains.some((domain) => url.hostname === domain) ||
        url.hostname.match(/feaas\S*\.blob\.core\.windows\.net/)
      );
    }
    return true;
  };

  // Register next Image to be used in Component Builder.
  // Nextjs image implementation will be used when img is rendered in component from Component Builder
  FEAAS.setElementImplementation('img', (attributes: Record<string, string>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, src, alt, ...imgAttributes } = attributes;
    return (
      <Image
        height={1920}
        width={1200}
        unoptimized={!shouldOptimize(src)}
        src={src}
        alt={alt}
        {...imgAttributes}
      />
    );
  });

  return <></>;
};

export default FEAASScripts;
