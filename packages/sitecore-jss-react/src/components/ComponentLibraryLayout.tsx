import React, { useEffect, useState } from 'react';
import { Placeholder } from './Placeholder';
import {
  ComponentRendering,
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  Field,
  GenericFieldValue,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss/layout';
import {
  COMPONENT_LIBRARY_READY_MESSAGE,
} from '@sitecore-jss/sitecore-jss/component-library';
import { EDITING_ALLOWED_ORIGINS } from '@sitecore-jss/sitecore-jss/editing';
import { getAllowedOriginsFromEnv } from '@sitecore-jss/sitecore-jss/utils';

export interface ComponentUpdateEventArgs {
  uid: string;
  params: Record<string, string>;
  fields: Record<string, Field<GenericFieldValue>>;
}

export const ComponentLibraryLayout = (layoutData: LayoutServiceData): JSX.Element => {
  const { route } = layoutData.sitecore;
  const [renderSwitch, setRenderSwitch] = useState(false);
  const rootComponent = route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering;
  // useEffect may execute multiple times - but we only want to subscribe and fire the events once
  let componentReady = false;
  let updateListenerReady = false;
  const allowedOrigins = EDITING_ALLOWED_ORIGINS.concat(getAllowedOriginsFromEnv());
  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the whole wide world of it too
    if (!componentReady) {
      componentReady = true;
      window.postMessage(COMPONENT_LIBRARY_READY_MESSAGE, '*');
    }
    if (!updateListenerReady) {
      window.addEventListener('message', (e) => {
        alert('event!');
        if (
          !e.origin ||
          !allowedOrigins.find((origin) => origin === e.origin) ||
          e.data.name !== 'component:update'
        ) {
          console.log('skipped %s %s', e.origin, e.data.name);
          return;
        }
        const eventArgs: ComponentUpdateEventArgs = {
          uid: e.data.uid,
          params: e.data.params,
          fields: e.data.field,
        };
        if (!eventArgs.uid) {
          console.debug('Received component:update event without uid, aborting event handler...');
          return;
        }

        const findComponent = (root: ComponentRendering): ComponentRendering | null => {
          if (root.uid?.toLowerCase() === eventArgs.uid.toLowerCase()) return root;
          if (root.placeholders) {
            for (const plhName of Object.keys(root.placeholders)) {
              for (const rendering of root.placeholders![plhName]) {
                const result = findComponent(rendering as ComponentRendering);
                if (result) return result;
              }
            }
          }
          return null;
        };

        const updateComponent = findComponent(rootComponent);

        if (updateComponent) {
          console.debug(
            'Found rendering with uid %s to update. Updating with fields %o and params %o',
            eventArgs.uid,
            eventArgs.fields,
            eventArgs.params
          );
          updateComponent.fields = { ...updateComponent.fields, ...eventArgs.fields };
          updateComponent.params = { ...updateComponent.params, ...eventArgs.params };
          setRenderSwitch(!renderSwitch);
        } else {
          console.debug('Rendering with uid %s not found', eventArgs.uid);
        }
      });
      updateListenerReady = true;
    }
  }, []);

  return (
    <main>
      <div id={EDITING_COMPONENT_ID}>
        {route && <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={route} />}
      </div>
    </main>
  );
};
