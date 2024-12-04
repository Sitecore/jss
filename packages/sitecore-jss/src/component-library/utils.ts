import { ComponentRendering, Field, GenericFieldValue } from '../layout/models';

export const COMPONENT_LIBRARY_READY_MESSAGE = { name: 'component:status', message: 'ready' };

export interface ComponentUpdateEventArgs {
  uid: string;
  params: Record<string, string>;
  fields: Record<string, Field<GenericFieldValue>>;
}
/**
 * Adds the browser-side event handler for 'component:update' message used in Component Library
 * The event should update a component on page by uid, with fields and params from event args
 * @param {ComponentRendering} rootComponent root component displayed for Component Library page
 * @param {Function} successCallback  callback to be called after successful component update
 */
export const addComponentUpdateHandler = (
  rootComponent: ComponentRendering,
  successCallback?: () => void
) => {
  if (!window) return;
  window.addEventListener('message', (e) =>
    updateComponentHandler(e, rootComponent, successCallback)
  );
};

const validateOrigin = (event: MessageEvent) => {
  // TODO: use `EDITING_ALLOWED_ORIGINS.concat(getAllowedOriginsFromEnv())` later
  // nextjs's JSS_ALLOWED_ORIGINS is not available on the client, need to use NEXT_PUBLIC_ variable, but it's a breaking change for Deploy
  const allowedOrigins = ['*'];
  return allowedOrigins.some(
    (origin) =>
      origin === event.origin ||
      new RegExp('^' + origin.replace('.', '\\.').replace(/\*/g, '.*') + '$').test(event.origin)
  );
};

export const updateComponentHandler = (
  e: MessageEvent,
  rootComponent: ComponentRendering,
  successCallback?: () => void
) => {
  if (!e.origin || !e.data || e.data.name !== 'component:update') {
    // avoid extra noise in logs
    if (!validateOrigin(e)) {
      console.debug(
        'Component Library: event skipped: message %s from origin %s',
        e.data.name,
        e.origin
      );
    }
    return;
  }
  const eventArgs: ComponentUpdateEventArgs = {
    uid: e.data.uid,
    params: e.data.params,
    fields: e.data.fields,
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
    if (successCallback) successCallback();
  } else {
    console.debug('Rendering with uid %s not found', eventArgs.uid);
  }
  // strictly for testing
  return rootComponent;
};
