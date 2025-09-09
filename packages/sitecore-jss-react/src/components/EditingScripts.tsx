import React, { JSX } from 'react';
import { EditMode, LayoutServicePageState, RenderingType } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';
import { getDesignLibraryScriptLink } from '@sitecore-jss/sitecore-jss/editing';

/**
 * - Renders client scripts and data for editing/preview mode for Pages
 * - Renders script required for the Design Library (when RenderingType is `component`).
 * This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.
 * @returns A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
 */
export const EditingScripts = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, editMode, clientData, clientScripts, renderingType },
    api,
  } = useSitecoreContext();

  // Don't render anything if not in editing/preview mode and rendering type is not component
  if (
    renderingType !== RenderingType.Component &&
    (pageState === LayoutServicePageState.Normal || pageState === LayoutServicePageState.Preview)
  ) {
    return <></>;
  }

  // In case of RenderingType.Component - render only the script for Design Libnrary
  if (renderingType === RenderingType.Component) {
    // Add cache buster to the script URL (format hh-dd-mm-yyyy, UTC)
    const now = new Date();
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const year = String(now.getUTCFullYear());
    const cacheTimestamp = `${hour}-${day}-${month}-${year}`;
    const scriptUrl = `${getDesignLibraryScriptLink(api?.edge?.edgeUrl)}?cb=${cacheTimestamp}`;

    return (
      <>
        <script src={scriptUrl} suppressHydrationWarning></script>
      </>
    );
  }

  if (editMode === EditMode.Metadata) {
    const jssClientData = { ...clientData, ...getJssPagesClientData() };

    return (
      <>
        {clientScripts?.map((src, index) => (
          <script src={src} key={index} />
        ))}
        {Object.keys(jssClientData).map((id) => (
          <script
            key={id}
            id={id}
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jssClientData[id]) }}
          />
        ))}
      </>
    );
  }

  return <></>;
};
