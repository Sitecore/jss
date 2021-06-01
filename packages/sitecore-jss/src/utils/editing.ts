import isServer from './is-server';

class ExperienceEditor {
  static isActive(): boolean {
    // eslint-disable-next-line
    const sc = window && (window as any).Sitecore;
    return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
  }
  static resetChromes(): void {
    // eslint-disable-next-line
    window && (window as any).Sitecore.PageModes.ChromeManager.resetChromes();
  }
}

class HorizonEditor {
  static isActive(): boolean {
    // Horizon will add "sc_horizon=editor" query string parameter for the editor and "sc_horizon=simulator" for the preview
    return window && window.location.search.indexOf('sc_horizon=editor') > -1;
  }
  static resetChromes(): void {
    // No way to reset chromes in Horizon, simply reload the canvas (iframe) instead
    window && window.location.reload();
  }
}

/**
 * Determines whether the current execution context is within a Sitecore editor
 * @returns true if executing within a Sitecore editor
 */
export const isEditorActive = (): boolean => {
  if (isServer()) {
    return false;
  }
  return ExperienceEditor.isActive() || HorizonEditor.isActive();
};

/**
 * Resets Sitecore editor "chromes"
 */
export const resetEditorChromes = (): void => {
  if (isServer()) {
    return;
  }
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
