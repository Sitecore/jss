import React, { useEffect, useMemo, useState } from 'react';
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
} from '@sitecore-jss/sitecore-jss/editing';
import { EditingScripts } from './EditingScripts';

export const ComponentLibraryLayout = (layoutData: LayoutServiceData): JSX.Element => {
  const { route } = layoutData.sitecore;
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
      window.top.postMessage(COMPONENT_LIBRARY_READY_MESSAGE, '*');
    }
    const unsubscribe = addComponentUpdateHandler(persistedRoot, (updatedRoot) =>
      setRootUpdate({ ...updatedRoot })
    );
    // useEffect will cleanup event handler on re-render
    return unsubscribe;
  }, []);

  return (
    <>
      <EditingScripts />
      <main>
        <div id={EDITING_COMPONENT_ID}>
          {route && <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={route} />}
        </div>
      </main>
    </>
  );
};
