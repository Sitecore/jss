import React, { useEffect, useMemo, useState } from 'react';
import { Placeholder } from './Placeholder';
import {
  ComponentRendering,
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss/layout';
import {
  ComponentLibraryStatus,
  getComponentLibraryStatusEvent,
  addComponentUpdateHandler,
} from '@sitecore-jss/sitecore-jss/editing';
import { EditingScripts } from './EditingScripts';

export const ComponentLibraryLayout = (layoutData: LayoutServiceData): JSX.Element => {
  const { route } = layoutData.sitecore;
  const [renderKey, setRenderKey] = useState(0);
  const [rootUpdate, setRootUpdate] = useState(null);
  const rootComponent = route?.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] as ComponentRendering;
  // useEffect may execute multiple times on single render (i.e. in dev) - but we only want to fire ready event once
  let componentReady = false;

  // have an up-to-date layout state between re-renders (SSR re-render excluded)
  const persistedRoot = useMemo(() => ({ ...(rootComponent || {}), ...rootUpdate }), [
    rootComponent,
    rootUpdate,
  ]);
  route.placeholders[EDITING_COMPONENT_PLACEHOLDER][0] = persistedRoot;

  useEffect(() => {
    // useEffect will fire when components are ready - and we inform the whole wide world of it too
    if (!componentReady) {
      componentReady = true;
      window.top.postMessage(
        getComponentLibraryStatusEvent(ComponentLibraryStatus.READY, rootComponent.uid),
        '*'
      );
    }
    const unsubscribe = addComponentUpdateHandler(persistedRoot, (updatedRoot) => {
      setRootUpdate({ ...updatedRoot });
      setRenderKey((key) => key + 1);
    });
    // useEffect will cleanup event handler on re-render
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Send a rendered event only as effect of a component update command
    if (renderKey === 0) {
      return;
    }

    window.top.postMessage(
      getComponentLibraryStatusEvent(ComponentLibraryStatus.RENDERED, rootComponent.uid),
      '*'
    );
  }, [renderKey, rootComponent.uid]);

  return (
    <>
      <EditingScripts />
      <main>
        <div id={EDITING_COMPONENT_ID}>
          {route && (
            <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={route} key={renderKey} />
          )}
        </div>
      </main>
    </>
  );
};
