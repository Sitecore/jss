import isServer from '../utils/is-server';

/**
 * Query parameter for editing secret
 */
export const QUERY_PARAM_EDITING_SECRET = 'secret';

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
