import isServer from './is-server';

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
 * Static utility class for Sitecore Experience Editor
 */
export class ExperienceEditor {
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
 * Static utility class for Sitecore Horizon Editor
 */
export class HorizonEditor {
  static isActive(): boolean {
    if (isServer()) {
      return false;
    }
    // Horizon will add "sc_horizon=editor" query string parameter for the editor and "sc_horizon=simulator" for the preview
    return window.location.search.indexOf('sc_horizon=editor') > -1;
  }
  static resetChromes(): void {
    if (isServer()) {
      return;
    }
    // Reset chromes in Horizon
    (window as ExtendedWindow)[ChromeRediscoveryGlobalFunctionName.name] &&
      ((window as ExtendedWindow)[ChromeRediscoveryGlobalFunctionName.name] as () => void)();
  }
}

/**
 * Determines whether the current execution context is within a Sitecore editor
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
        '.scChromeDropDown > a[href="#"], a[onclick]'
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
 * Determines whether the current execution context is within the Sitecore Experience Editor
 * @deprecated Will be removed in a future release. Please use isEditorActive instead.
 * @returns true if executing within the Sitecore Experience Editor
 */
export const isExperienceEditorActive = isEditorActive;

/**
 * Resets Sitecore Experience Editor "chromes"
 * @deprecated Will be removed in a future release. Please use resetEditorChromes instead.
 */
export const resetExperienceEditorChromes = resetEditorChromes;
