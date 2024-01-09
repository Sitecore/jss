import { SitecoreContextMap } from "../context";
import locales from '../../../locales.json';
import config from "@temp/config";

export function useTranslations() {
  return function t(key: string) {
    const dictionary = SitecoreContextMap.get("dictionary");
    if (!dictionary) {
      return key;
    }
    return dictionary[key];
  };
}

export function getRoutePath(url: string, locale: string): string {
  if (locale === config.defaultLanguage) {
    return url;
  }

  const parts = url.split("/");

  if (parts[1] === locale) {
    parts.splice(1, 1);

    return parts.length === 1 ? '/' : parts.join("/");
  }

  return '/';
}

export function getLocales() {
  return locales;
}
