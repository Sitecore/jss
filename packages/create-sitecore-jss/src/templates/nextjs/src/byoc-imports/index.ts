// This is a bundler for external React (BYOC) components
// It allow you to register components in client-only or SSR/hybrid contexts

// Import your client-only components via client-bundle. Nextjs's dynamic() call will ensure they are only rendered client-side
import dynamic from 'next/dynamic';
const ClientBundle = dynamic(() => import('./index.client'), {
  ssr: false,
});

/**
 * You can import your SSR/hybrid components here, for example
 * import './MyNewComponent';
 * or
 * import 'src/otherFolder/MyOtherComponent
 */

// As long as client bundle is exported and rendered on page, client-only BYOC components are registered and become available
// The rest of components will be regsitered in both server and client-side contexts when this module is imported in Layout
export default ClientBundle;
 