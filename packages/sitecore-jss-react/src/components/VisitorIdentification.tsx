import React from 'react';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';

interface VIProps {
  sitecoreContext: {
    pageEditing?: boolean;
    visitorIdentificationTimestamp?: string;
  };
}

let emittedVI = false;
const VIComponent: React.FC<VIProps> = ({ sitecoreContext }) => {
  if (
    emittedVI ||
    typeof document === 'undefined' ||
    sitecoreContext.pageEditing ||
    !sitecoreContext.visitorIdentificationTimestamp
  ) {
    // Don't emit VI script and meta tag if we've already done so,
    // aren't rendering client-side, are in Experience Editor, or
    // don't have a VI timestamp.
    return null;
  }
  emittedVI = true;

  const script = document.createElement('script');
  script.src = `/layouts/system/VisitorIdentification.js`;
  script.type = 'text/javascript';

  const meta = document.createElement('meta');
  meta.name = 'VIcurrentDateTime';
  meta.content = sitecoreContext.visitorIdentificationTimestamp;

  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
  head.appendChild(meta);

  return null;
};

VIComponent.displayName = 'VisitorIdentification';

export const VisitorIdentification = withSitecoreContext()(VIComponent);
