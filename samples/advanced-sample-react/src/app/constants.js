export const NAME = 'app';
export const DEFAULT_LANGUAGE = 'en';
export const NOT_FOUND_ROUTE = '/notfound';
export const SERVER_ERROR_ROUTE = '/error';
export const SITECORE_ROUTES = [
  "/:lang([a-zA-Z]{2}-[a-zA-Z]{2})/:sitecoreRoute*",
  "/:lang([a-zA-Z]{2})/:sitecoreRoute*",
  "/:sitecoreRoute*"
];
