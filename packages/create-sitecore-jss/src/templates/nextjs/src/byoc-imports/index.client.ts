import * as FEAAS from '@sitecore-feaas/clientside/react';

/**
 * Below are built-in JSS imports. These should be available in Pages, if a license required for specific components is present
 */
import '@sitecore/components/form';
// end of JSS imports

/** 
 * You can import your client component here, for example
 * import './MyClientComponent';
 */

export default (props: unknown) => FEAAS.ExternalComponent(props);
