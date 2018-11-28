import React from 'react';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';

interface VIProps {
  sitecoreContext: {
    visitorIdentificationTimestamp?: string;
  };
}

let emittedVI = false;
let VIComponent: React.SFC<VIProps> = ({ sitecoreContext }) => {
  if (
    !emittedVI &&
    typeof document !== 'undefined' &&
    sitecoreContext.visitorIdentificationTimestamp
  ) {
    emittedVI = true;
    const script = document.createElement('script');
    script.src = `/layouts/system/VisitorIdentification.js`;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    return (
      <meta name="VIcurrentDateTime" content={sitecoreContext.visitorIdentificationTimestamp} />
    );
  }

  return null;
};

VIComponent.displayName = 'VisitorIdentification';

export const VisitorIdentification = withSitecoreContext()(VIComponent);
