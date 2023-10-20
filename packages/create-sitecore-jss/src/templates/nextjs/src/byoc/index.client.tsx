import * as FEAAS from '@sitecore-feaas/clientside/react';
import React from 'react';
import { ComponentProps } from 'react';
/**
 * Below are built-in JSS imports. These should be available in Pages, if a license required for specific components is present
 * Any built-in import can be removed if not used.
 */

// SitecoreForm component which enables Forms for XM Cloud functionality. Requires a license to be available in Pages.
// Sitecore Forms for Sitecore XP are still available separately via @sitecore-jss-forms package
import '@sitecore/components/form';

/**
 * End of built-in JSS imports
 * You can import your own client component below, for example
 * import './MyClientComponent';
 */

// An important boilerplate component that prevents BYOC components from being optimized away. Should be kept in this file.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultExport = (props: ComponentProps<any>) => FEAAS.ExternalComponent(props) || <></>;
export default DefaultExport;
