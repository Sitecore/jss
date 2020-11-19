import React from 'react';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';

interface VIProps {
  sitecoreContext: {
    visitorIdentificationTimestamp?: string;
  };
}

let emittedVI = false;
const VIComponent: React.FC<VIProps> = ({ sitecoreContext }) => {
  if (
    emittedVI ||
    typeof document === 'undefined' ||
    !sitecoreContext.visitorIdentificationTimestamp
  ) {
    // Don't emit VI script and meta tag if we've already done so,
    // aren't rendering client-side, or don't have a VI timestamp.
    return null;
  }
  emittedVI = true;

  const script = document.createElement('script');
  script.src = `/layouts/system/VisitorIdentification.js`;
  script.type = 'text/javascript';

  const meta = document.createElement('meta');
  meta.name = 'VIcurrentDateTime';
  meta.content = sitecoreContext.visitorIdentificationTimestamp;

  const head = document.querySelector('head');
  head && head.appendChild(script);
  head && head.appendChild(meta);

  return null;
};

VIComponent.displayName = 'VisitorIdentification';

export const VisitorIdentification = withSitecoreContext()(VIComponent);
