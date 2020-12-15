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

export const isAbsoluteUrl = (url?: string) => {
  if (url == null) {
    return false;
  }
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^[a-z][a-z0-9+.-]*:/.test(url);
};
