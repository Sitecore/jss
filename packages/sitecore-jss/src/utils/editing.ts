import isServer from './is-server';

/**
 * Static utility class for Sitecore Experience Editor
 */
export class ExperienceEditor {
  static isActive(): boolean {
    if (isServer()) {
      return false;
    }
    // eslint-disable-next-line
    const sc = (window as any).Sitecore;
    return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
  }
  static resetChromes(): void {
    if (isServer()) {
      return;
    }
    // eslint-disable-next-line
    (window as any).Sitecore.PageModes.ChromeManager.resetChromes();
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
    // eslint-disable-next-line
    (window as any)[ChromeRediscoveryGlobalFunctionName.name]();
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
