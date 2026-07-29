import isServer from '../utils/is-server';

/**
 * Default value of uid for root placeholder when uid is not present.
 */
export const DEFAULT_PLACEHOLDER_UID = '00000000-0000-0000-0000-000000000000';

/**
 * Query parameter for editing secret
 */
export const QUERY_PARAM_EDITING_SECRET = 'secret';

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
  /**
   * Determines whether the current execution context is within a Experience Editor.
   * Experience Editor environment can be identified only in the browser
   * @returns true if executing within a Experience Editor
   */
  static isActive(): boolean {
    if (isServer()) {
      return false;
    }

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
 * Determines whether the current execution context is within a Sitecore editor.
 * Sitecore Editor environment can be identified only in the browser
 * @returns true if executing within a Sitecore editor
 */
export const isEditorActive = (): boolean => {
  return ExperienceEditor.isActive();
};

/**
 * Resets Sitecore editor "chromes"
 */
export const resetEditorChromes = (): void => {
  if (ExperienceEditor.isActive()) {
    ExperienceEditor.resetChromes();
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
