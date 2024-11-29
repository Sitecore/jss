'use client';

import React, { useEffect } from 'react';
import { Placeholder } from './Placeholder';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';
import { HTMLLink } from '@sitecore-jss/sitecore-jss';
// import { Placeholder, LayoutServiceData, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

export interface UpdatePropsEventArgs {
  uid: string;
  params: Record<string, string>;
  fields: Record<string, unknown>;
}

export const ComponentLibraryLayout = ({ layoutData }: LayoutProps): JSX.Element => {
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
          <div id="component">
            {route && <Placeholder name="editing-componentmode-placeholder" rendering={route} />}
          </div>
        </main>
      </div>
    </>
  );
};
