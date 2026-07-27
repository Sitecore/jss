import React, { JSX } from 'react';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import { getJssPagesClientData } from '@sitecore-jss/sitecore-jss/editing';

/**
 * - Renders client scripts and data for editing/preview mode for Pages
 * This script is only rendered when EditMode is Metadata, otherwise it renders nothing.
 * @returns A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
 */
export const EditingScripts = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, editMode, clientData, clientScripts },
  } = useSitecoreContext();

  // Don't render anything if not in editing/preview mode
  if (pageState === LayoutServicePageState.Normal || pageState === LayoutServicePageState.Preview) {
    return <></>;
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
