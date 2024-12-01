'use client';

import React, { useEffect } from 'react';
import { Placeholder } from './Placeholder';
import { debug } from '@sitecore-jss/sitecore-jss';
import {
  ComponentRendering,
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  Field,
  GenericFieldValue,
  LayoutServiceData,
  RestComponentLibraryService,
} from '@sitecore-jss/sitecore-jss/layout';

export interface ComponentUpdateEvent extends CustomEvent {
  uid: string;
  params: Record<string, string>;
  fields: Record<string, Field<GenericFieldValue>>;
}

export interface ComponentLibraryLayoutProps {
  layoutData: LayoutServiceData;
  config: Record<string, string>;
}

export const ComponentLibraryLayout = ({
  layoutData,
  config,
}: ComponentLibraryLayoutProps): JSX.Element => {
  // useEffect may execute multiple times - but we only want to subscribe and fire the events once
  const { route, context } = layoutData.sitecore;
  const component = route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering;
  let componentReady = false;
  let updateListenerReady = false;
  let ssrComponentDetails = {
    siteName: context.site?.name,
    itemId: route?.itemId || '',
    language: context.language,
    componentUid: component?.uid || '',
    renderingId: component?.params ? component.params.RenderingIdentifier : '',
    dataSourceId: component.dataSource,
    version: route?.itemVersion ? route.itemVersion.toString() : 'latest',
  };
  const componentService = new RestComponentLibraryService({
    apiHost: config.sitecoreApiHost,
    apiKey: config.sitecoreApiKey,
    siteName: config.site,
    configurationName: config.layoutServiceConfigurationName,
  });
  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the wide world of it too
    if (!componentReady) {
      const readyEvent = new CustomEvent('component:status', { detail: 'ready' });
      window.dispatchEvent(readyEvent);
      componentReady = true;
    }
    if (!updateListenerReady) {
      window.addEventListener('component:update', async (e) => {
        const event = e as ComponentUpdateEvent;
        const eventDetail = event.detail;
        if (!eventDetail.uid) {
          debug.editing('Received component:update event without uid, aborting event handler...');
          return;
        }
        ssrComponentDetails = { ...ssrComponentDetails, ...eventDetail.params };
        if (ssrComponentDetails.itemId && ssrComponentDetails.componentUid) {
          layoutData = await componentService.fetchComponentData(ssrComponentDetails);
        }
        const fields = (route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering)
          .fields;
        (route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering).fields = {
          ...fields,
          ...eventDetail.fields,
        };
      });
      updateListenerReady = true;
    }
  }, [layoutData]);

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
