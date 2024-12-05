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
  // useEffect may execute multiple times on single render (i.e. in dev) - but we only want to fire ready event once
  let componentReady = false;

  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the whole wide world of it too
    if (!componentReady) {
      componentReady = true;
      window.top.postMessage(COMPONENT_LIBRARY_READY_MESSAGE, '*');
    }
    const unsubscribe = addComponentUpdateHandler(rootComponent, () =>
      setRenderSwitch(!renderSwitch)
    );
    // useEffect will cleanup event handler on re-render
    return unsubscribe;
  }, []);

  return (
    <main>
      <div id={EDITING_COMPONENT_ID}>
        {route && <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={route} />}
      </div>
    </main>
  );
};
