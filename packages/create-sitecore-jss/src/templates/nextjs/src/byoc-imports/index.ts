// This is an out-of-box bundler for External components (BYOC)
// It enables registering components in client-only or SSR/hybrid contexts
// It's recommended to not modify this file - please add BYOC imports in corresponding index.*.ts files instead

// Import your client-only components via client-bundle. Nextjs's dynamic() call will ensure they are only rendered client-side
import dynamic from 'next/dynamic';
const ClientBundle = dynamic(() => import('./index.client'), {
  ssr: false,
});

// Import your SSR/hybrid components via index.hybrid.ts
import './index.hybrid';

// As long as client bundle is exported and rendered on page (as an empty element), client-only BYOC components are registered and become available
// The rest of components will be regsitered in both server and client-side contexts when this module is imported into Layout
export default ClientBundle;
 