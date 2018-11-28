export const isServer = (): boolean => !(typeof window !== 'undefined' && window.document);

export const isExperienceEditorActive = (): boolean => {
  if (isServer()) {
    return false;
  }
  const sc = (window as any).Sitecore;
  return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
};

export const resetExperienceEditorChromes = (): void => {
  if (isExperienceEditorActive()) {
    (window as any).Sitecore.PageModes.ChromeManager.resetChromes();
  }
};
