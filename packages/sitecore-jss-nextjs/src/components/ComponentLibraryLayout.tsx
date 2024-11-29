'use client';

import React, { useEffect } from 'react';
import { Placeholder } from './Placeholder';
import {
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss/layout';

export interface UpdatePropsEventArgs {
  uid: string;
  params: Record<string, string>;
  fields: Record<string, unknown>;
}

export const ComponentLibraryLayout = (layoutData: LayoutServiceData): JSX.Element => {
  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the wide world of it too
    const readyEvent = new CustomEvent('component:status', { detail: 'ready' });
    window.dispatchEvent(readyEvent);
  }, [layoutData]);

  const { route } = layoutData.sitecore;
  const mainClassPageEditing = 'component-mode';
  return (
    <>
      <div className={mainClassPageEditing}>
        <main>
          <div id={EDITING_COMPONENT_ID}>
            {route && <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={route} />}
          </div>
        </main>
      </div>
    </>
  );
};
