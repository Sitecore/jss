import React from 'react';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';

interface VisitorIdentificationProps {
  defer?: boolean;
}

let emittedVI = false;
const VIComponent: React.FC<VisitorIdentificationProps> = (props) => {
  const { sitecoreContext } = useSitecoreContext();

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
  script.src = '/layouts/system/VisitorIdentification.js';
  script.type = 'text/javascript';
  script.defer = props.defer;

  const meta = document.createElement('meta');
  meta.name = 'VIcurrentDateTime';
  meta.content = sitecoreContext.visitorIdentificationTimestamp.toString();

  const head = document.querySelector('head');
  head && head.appendChild(script);
  head && head.appendChild(meta);

  return null;
};

VIComponent.displayName = 'VisitorIdentification';

/**
 * Reset the VI switch to allow VIComponent to render
 * Mainly for unit testing
 */
export function resetEmittedVI() {
  emittedVI = false;
}

export const VisitorIdentification = VIComponent;
