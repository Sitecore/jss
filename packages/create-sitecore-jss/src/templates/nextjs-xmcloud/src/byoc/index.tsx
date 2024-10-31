import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import * as Events from '@sitecore-cloudsdk/events/browser';
import '@sitecore/components/context';
import dynamic from 'next/dynamic';
import config from 'temp/config';
import {
  LayoutServicePageState,
  SitecoreContextReactContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
/**
 * This is an out-of-box bundler for External components (BYOC) (see Sitecore documentation for more details)
 * It enables registering components in client-only or SSR/hybrid contexts
 * It's recommended to not modify this file - please add BYOC imports in corresponding index.*.ts files instead
 */

// Import your client-only components via client-bundle. Nextjs's dynamic() call will ensure they are only rendered client-side
const ClientBundle = dynamic(() => import('./index.client'), {
  ssr: false,
});

// As long as component bundle is exported and rendered on page (as an empty element), client-only BYOC components are registered and become available
// The rest of components will be regsitered in both server and client-side contexts when this module is imported into Layout
FEAAS.enableNextClientsideComponents(dynamic, ClientBundle);

// Import your hybrid (server rendering with client hydration) components via index.hybrid.ts
import './index.hybrid';

const BYOCInit = (): JSX.Element | null => {
  const sitecoreContext = React.useContext(SitecoreContextReactContext).context;
  // Set context properties to be available within BYOC components
  FEAAS.setContextProperties({
    sitecoreEdgeUrl: config.sitecoreEdgeUrl,
    sitecoreEdgeContextId: config.sitecoreEdgeContextId,
    pageState: sitecoreContext?.pageState || LayoutServicePageState.Normal,
    siteName: sitecoreContext?.site?.name || config.sitecoreSiteName,
    eventsSDK: Events,
  });

  return <FEAAS.ExternalComponentBundle />;
};

export default BYOCInit;
