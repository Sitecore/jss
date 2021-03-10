import * as routing from './routing-utils';
import * as layoutData from './layout-data-utils';

export const isServer = (): boolean => !(typeof window !== 'undefined' && window.document);

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

export { routing, layoutData };
