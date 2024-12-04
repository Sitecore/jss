import React, { useEffect, useState } from 'react';
import { Placeholder } from './Placeholder';
import {
  ComponentRendering,
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss/layout';
import {
  addComponentUpdateHandler,
  COMPONENT_LIBRARY_READY_MESSAGE,
} from '@sitecore-jss/sitecore-jss/component-library';

export const ComponentLibraryLayout = (layoutData: LayoutServiceData): JSX.Element => {
  const { route } = layoutData.sitecore;
  const [renderSwitch, setRenderSwitch] = useState(false);
  const rootComponent = route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering;
  // useEffect may execute multiple times - but we only want to subscribe and fire the events once
  let componentReady = false;
  let [updateListenerReady] = useState(false);

  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the whole wide world of it too
    if (!componentReady) {
      componentReady = true;
      window.postMessage(COMPONENT_LIBRARY_READY_MESSAGE, '*');
    }
    if (!updateListenerReady) {
      addComponentUpdateHandler(rootComponent, () => setRenderSwitch(!renderSwitch));
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
