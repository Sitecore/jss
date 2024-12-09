import { ComponentRendering, Field, GenericFieldValue } from '../layout/models';
import isServer from '../utils/is-server';

/**
 * Default value of uid for root placeholder when uid is not present.
 */
export const DEFAULT_PLACEHOLDER_UID = '00000000-0000-0000-0000-000000000000';

/**
 * Query parameter for editing secret
 */
export const QUERY_PARAM_EDITING_SECRET = 'secret';

/**
 * Event contents to be sent when component library page is ready and rendered
 */
export const COMPONENT_LIBRARY_READY_MESSAGE = { name: 'component:status', message: 'ready' };

/**
 * ID to be used as a marker for a script rendered in XMC Pages
 * Should identify app is in XM Cloud Pages editing mode
 */
export const PAGES_EDITING_MARKER = 'jss-hrz-editing';

/**
 * Default allowed origins for editing requests. This is used to enforce CORS, CSP headers.
 */
export const EDITING_ALLOWED_ORIGINS = ['https://pages.sitecorecloud.io'];

type ExtendedWindow = Window &
  typeof globalThis & {
    [key: string]: unknown;
    Sitecore: {
      PageModes: {
        ChromeManager: {
          resetChromes: () => void;
        };
      };
    };
  };

/**
 * Event args for Component Library `update` event
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
 * Application metadata
 */
export interface Metadata {
  packages: { [key: string]: string };
}

/**
 * Static utility class for Sitecore Experience Editor
 */
export class ExperienceEditor {
  /**
   * Determines whether the current execution context is within a Experience Editor.
   * Experience Editor environment can be identified only in the browser
   * @returns true if executing within a Experience Editor
   */
  static isActive(): boolean {
    if (isServer()) {
      return false;
    }
    // eslint-disable-next-line
    const sc = (window as ExtendedWindow).Sitecore;
    return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
  }
  static resetChromes(): void {
    if (isServer()) {
      return;
    }
    (window as ExtendedWindow).Sitecore.PageModes.ChromeManager.resetChromes();
  }
}

/**
 * Copy of chrome rediscovery contract from Horizon (chrome-rediscovery.contract.ts)
 */
export const ChromeRediscoveryGlobalFunctionName = {
  name: 'Sitecore.Horizon.ResetChromes',
};

/**
 * Static utility class for Sitecore Pages Editor (ex-Horizon)
 */
export class HorizonEditor {
  /**
   * Determines whether the current execution context is within a Pages Editor.
   * Pages Editor environment can be identified only in the browser
   * @returns true if executing within a Pages Editor
   */
  static isActive(): boolean {
    if (isServer()) {
      return false;
    }
    // Check for Chromes mode
    const chromesCheck = window.location.search.indexOf('sc_headless_mode=edit') > -1;
    // JSS will render a jss-exclusive script element in Metadata mode to indicate edit mode in Pages
    return chromesCheck || !!window.document.getElementById(PAGES_EDITING_MARKER);
  }
  static resetChromes(): void {
    if (isServer()) {
      return;
    }
    // Reset chromes in Pages
    (window as ExtendedWindow)[ChromeRediscoveryGlobalFunctionName.name] &&
      ((window as ExtendedWindow)[ChromeRediscoveryGlobalFunctionName.name] as () => void)();
  }
}

/**
 * Determines whether the current execution context is within a Sitecore editor.
 * Sitecore Editor environment can be identified only in the browser
 * @returns true if executing within a Sitecore editor
 */
export const isEditorActive = (): boolean => {
  return ExperienceEditor.isActive() || HorizonEditor.isActive();
};

/**
 * Resets Sitecore editor "chromes"
 */
export const resetEditorChromes = (): void => {
  if (ExperienceEditor.isActive()) {
    ExperienceEditor.resetChromes();
  } else if (HorizonEditor.isActive()) {
    HorizonEditor.resetChromes();
  }
};

/**
 * @description in Experience Editor, anchor tags
 * with both onclick and href attributes will use the href, blocking the onclick from firing.
 * This function makes it so the anchor tags function as intended in the sample when using Experience Editor
 *
 * The Mutation Observer API is used to observe changes to the body, then select all elements with href="#" and an onclick,
 * and replaces the # value with javascript:void(0); which prevents the anchor tag from blocking the onclick event handler.
 * @see Mutation Observer API: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver
 */
export const handleEditorAnchors = () => {
  // The sample gives the href attribute priority over the onclick attribute if both are present, so we must replace
  // the href attribute to avoid overriding the onclick in Experience Editor
  if (!window || !ExperienceEditor.isActive()) {
    return;
  }
  const targetNode = document.querySelector('body');
  const callback = (mutationList: MutationRecord[]) => {
    mutationList.forEach((mutation: MutationRecord) => {
      const btns: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
        '.scChromeDropDown > a[href="#"], .scChromeDropDown > a[href="#!"], a[onclick]'
      );
      if (mutation.type === 'childList') {
        btns.forEach((link: HTMLAnchorElement) => {
          link.href = 'javascript:void(0);';
        });
      }
      return;
    });
  };
  const observer: MutationObserver = new MutationObserver(callback);
  const observerOptions = {
    childList: true,
    subtree: true,
  };
  if (targetNode) {
    observer.observe(targetNode, observerOptions);
  }
};

/**
 * Gets extra JSS clientData scripts to render in XMC Pages in addition to clientData from Pages itself
 * @returns {Record} collection of clientData
 */
export const getJssPagesClientData = () => {
  const clientData: Record<string, Record<string, unknown>> = {};
  clientData[PAGES_EDITING_MARKER] = {};

  return clientData;
};

/**
 * Adds the browser-side event handler for 'component:update' message used in Component Library
 * The event should update a component on page by uid, with fields and params from event args
 * @param {ComponentRendering} rootComponent root component displayed for Component Library page
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
        'Component Library: event skipped: message %s from origin %s',
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
      'Found rendering with uid %s to update. Updating with fields %o and params %o',
      eventArgs.details.uid,
      eventArgs.details.fields,
      eventArgs.details.params
    );
    updateComponent.fields = { ...updateComponent.fields, ...eventArgs.details.fields };
    updateComponent.params = { ...updateComponent.params, ...eventArgs.details.params };
    if (successCallback) successCallback(rootComponent);
  } else {
    console.debug('Rendering with uid %s not found', eventArgs.details.uid);
  }
  // strictly for testing
  return rootComponent;
};
