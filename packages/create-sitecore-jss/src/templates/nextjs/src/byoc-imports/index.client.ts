import * as FEAAS from '@sitecore-feaas/clientside/react';

/**
 * Below are built-in JSS imports. These should be available in Pages, if a license required for specific components is present
 * Any built-in import can be removed if not used.
 */

// SitecoreForm component which enables new Sitecore Forms for XMCloud functionality. Requires a license to be available in Pages.
// Sitecore Forms for Sitecore XP are still available separately via @sitecore-jss-forms package
import '@sitecore/components/form';

/**
 * End of built-in JSS imports
 * You can import your own client component below, for example
 * import './MyClientComponent';
 */

// Client components bundle exporting an empty ExternalComponent enables proper BYOC registration and prevents nextjs from optimizing components away
export default (props: unknown) => FEAAS.ExternalComponent(props);
