import React from 'react';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { useSitecoreContext } from '../enhancers/withSitecoreContext';
import { getJssHorizonClientData } from '@sitecore-jss/sitecore-jss/editing';

/**
 * Renders client scripts and data for editing/preview mode in Pages.
 * This script is only rendered when EditMode is Metadata, otherwise it renders nothing.
 */
export const EditingScripts = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, editMode, clientData, clientScripts },
  } = useSitecoreContext();

  const renderClientData = () => (
    <>
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

  // Don't render anything if not in editing/preview mode
  if (pageState === LayoutServicePageState.Normal) return <></>;

  let jssClientData: Record<string, unknown> = {};
  if (pageState === LayoutServicePageState.Edit) {
    jssClientData = getJssHorizonClientData();
    if (editMode === EditMode.Chromes) {
      return renderClientData();
    }
  }

  if (editMode === EditMode.Metadata) {
    jssClientData = { ...clientData, ...jssClientData };
    return (
      <>
        {clientScripts?.map((src, index) => (
          <script src={src} key={index} />
        ))}
        {renderClientData()}
      </>
    );
  }

  return <></>;
};
