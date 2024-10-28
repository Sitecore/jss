import * as FEAAS from '@sitecore-feaas/clientside/react';
import * as Events from '@sitecore-cloudsdk/events/browser';
import '@sitecore/components/context';
import dynamic from 'next/dynamic';
import config from 'temp/config';
/**
 * This is an out-of-box bundler for External components (BYOC) (see Sitecore documentation for more details)
 * It enables registering components in client-only or SSR/hybrid contexts
 * It's recommended to not modify this file - please add BYOC imports in corresponding index.*.ts files instead
 */

// Import your hybrid (server rendering with client hydration) components via index.hybrid.ts
import './index.hybrid';

// Import your client-only components via client-bundle. Nextjs's dynamic() call will ensure they are only rendered client-side
const ClientBundle = dynamic(() => import('./index.client'), {
  ssr: false,
});

// As long as component bundle is exported and rendered on page (as an empty element), client-only BYOC components are registered and become available
// The rest of components will be regsitered in both server and client-side contexts when this module is imported into Layout
FEAAS.enableNextClientsideComponents(dynamic, ClientBundle);
// Set context properties to be available within BYOC components
FEAAS.setContextProperties({
  sitecoreEdgeUrl: config.sitecoreEdgeUrl,
  sitecoreEdgeContextId: config.sitecoreEdgeContextId,
  siteName: config.sitecoreSiteName,
  eventsSDK: Events,
});

export default FEAAS.ExternalComponentBundle;
