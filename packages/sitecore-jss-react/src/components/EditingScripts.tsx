import React from 'react';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';

/**
 * Renders client scripts and data for editing/preview mode in Pages.
 * This script is only rendered when EditMode is Metadata, otherwise it renders nothing.
 */
export const EditingScripts = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, editMode, clientData, clientScripts },
  } = useSitecoreContext();

  // Don't render anything if not in editing/preview mode
  if (pageState === LayoutServicePageState.Normal) return <></>;

  if (editMode === EditMode.Metadata) {
    return (
      <>
        {clientScripts?.map((src, index) => (
          <script src={src} key={index} />
        ))}
        {clientData &&
          Object.keys(clientData).map((id) => (
            <script
              key={id}
              id={id}
              type="application/json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(clientData[id]) }}
            />
          ))}
      </>
    );
  }

  return <></>;
};
