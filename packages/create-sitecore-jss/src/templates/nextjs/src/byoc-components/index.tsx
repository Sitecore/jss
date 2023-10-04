// This is a bundler for external (BYOC) components
// It allow you to register components in client-only or server/hybrid contexts

// This imports built-in components. Do not remove.
import 'temp/SSR-builtin-import';

// Import your client-only components via client-bundle. Nextjs's dynamic() call will ensure they are only rendered client-side
import dynamic from 'next/dynamic';
const ClientBundle = dynamic(() => import('./client-bundle'), {
  ssr: false,
});

/**
 * You can import your SSR/hybrid here, for example
 * import './MyNewComponent';
 * or
 * import '../otherFolder/MyOtherComponent
 */

// As long as client bundle is exported and rendered on page, client-only BYOC components are registered and become available
// The rest of components will be regsitered in both server and client-side contexts when this module is imported in Layout
export default ClientBundle;
 