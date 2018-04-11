import { matchPath } from 'react-router-dom';
import { SITECORE_ROUTES } from './constants';

/* eslint-disable no-param-reassign, no-restricted-syntax */

export const parseRouteUrl = (url) => {
  if (!url) {
    return null;
  }

  for (const path of SITECORE_ROUTES) {
    const match = matchPath(url, { path });
    if (match && match.params) {
      return match.params;
    }
  }
  return null;
};

export const buildRouteUrl = (params) => {
  if (!params.sitecoreRoute) {
    params.sitecoreRoute = '/';
  }
  if (!params.sitecoreRoute.startsWith('/')) {
    params.sitecoreRoute = `/${params.sitecoreRoute}`;
  }
  if (!params.lang) {
    return params.sitecoreRoute;
  }
  return `/${params.lang}${params.sitecoreRoute}`;
};

export const getRouteUrl = (lang, sitecoreRoute) => {
  const params = {
    lang,
    sitecoreRoute,
  };
  return buildRouteUrl(params);
};
