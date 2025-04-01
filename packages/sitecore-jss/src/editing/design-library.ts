import { ComponentRendering, Field, GenericFieldValue } from '../layout/models';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';

/**
 * Event to be sent when report status to design library
 */
export const DESIGN_LIBRARY_STATUS_EVENT_NAME = 'component:status';

/**
 * Represents an event indicating the status of a component in the library.
 */
export interface DesignLibraryStatusEvent {
  name: typeof DESIGN_LIBRARY_STATUS_EVENT_NAME;
  message: {
    status: 'ready' | 'rendered';
    uid: string;
  };
}

/**
 * Enumeration of statuses for the Design Library.
 */
export enum DesignLibraryStatus {
  READY = 'ready',
  RENDERED = 'rendered',
}

/**
 * Event args for Design Library `update` event
 */
export interface ComponentUpdateEventArgs {
  name: string;
  details?: {
    uid: string;
    params?: Record<string, string>;
    fields?: Record<string, Field<GenericFieldValue>>;
  };
}

/**
 * Adds the browser-side event handler for 'component:update' message used in Design Library
 * The event should update a component on page by uid, with fields and params from event args
 * @param {ComponentRendering} rootComponent root component displayed for Design Library page
 * @param {Function} successCallback  callback to be called after successful component update
 */
export const addComponentUpdateHandler = (
  rootComponent: ComponentRendering,
  successCallback?: (updatedRootComponent: ComponentRendering) => void
) => {
  if (!window) return;
  const handler = (e: MessageEvent) => updateComponentHandler(e, rootComponent, successCallback);
  window.addEventListener('message', handler);
  // the power to remove handler outside of this function, if needed
  const unsubscribe = () => {
    window.removeEventListener('message', handler);
  };
  return unsubscribe;
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
  successCallback?: (updatedRootComponent: ComponentRendering) => void
) => {
  const eventArgs: ComponentUpdateEventArgs = e.data;
  if (!e.origin || !eventArgs || eventArgs.name !== 'component:update') {
    // avoid extra noise in logs
    if (!validateOrigin(e)) {
      console.debug(
        'Design Library: event skipped: message %s from origin %s',
        eventArgs.name,
        e.origin
      );
    }
    return;
  }
  if (!eventArgs.details?.uid) {
    console.debug('Received component:update event without uid, aborting event handler...');
    return;
  }

  const findComponent = (root: ComponentRendering): ComponentRendering | null => {
    if (root.uid?.toLowerCase() === eventArgs.details?.uid.toLowerCase()) return root;
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
      'Found component with uid %s to update. Update fields: %o. Update params: %o.',
      eventArgs.details.uid,
      eventArgs.details.fields,
      eventArgs.details.params
    );
    if (eventArgs.details.fields) {
      updateComponent.fields = { ...updateComponent.fields, ...eventArgs.details.fields };
    }
    if (eventArgs.details.params) {
      updateComponent.params = { ...updateComponent.params, ...eventArgs.details.params };
    }
    if (successCallback) successCallback(rootComponent);
  } else {
    console.debug('Rendering with uid %s not found', eventArgs.details.uid);
  }
  // strictly for testing
  return rootComponent;
};

/**
 * Generates a DesignLibraryStatusEvent with the given status and uid.
 * @param {DesignLibraryStatus} status - The status of rendering.
 * @param {string} uid - The unique identifier for the event.
 * @returns An object representing the DesignLibraryStatusEvent.
 */
export function getDesignLibraryStatusEvent(
  status: DesignLibraryStatus,
  uid: string
): DesignLibraryStatusEvent {
  return {
    name: DESIGN_LIBRARY_STATUS_EVENT_NAME,
    message: {
      status,
      uid,
    },
  };
}

/**
 * Generates the URL for the design library script link.
 * @param {string} [sitecoreEdgeUrl] Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io
 * @returns The full URL to the design library script.
 */
export function getDesignLibraryScriptLink(sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT): string {
  return `${sitecoreEdgeUrl}/v1/files/designlibrary/lib/rh-lib-script.js`;
}
