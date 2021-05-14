import isServer from './is-server';

export const isExperienceEditorActive = (): boolean => {
  if (isServer()) {
    return false;
  }
  // eslint-disable-next-line
  const sc = (window as any).Sitecore;
  return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
};

export const resetExperienceEditorChromes = (): void => {
  if (isExperienceEditorActive()) {
    // eslint-disable-next-line
    (window as any).Sitecore.PageModes.ChromeManager.resetChromes();
  }
};
