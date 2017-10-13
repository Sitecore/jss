/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/extensions: 0 */

import { push } from 'react-router-redux';
import DataProvider from 'data-provider';
import { actionTypes as sitecoreActionTypes, isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-react';
import i18n from 'i18next';
import { NOT_FOUND_ROUTE, SERVER_ERROR_ROUTE, DEFAULT_LANGUAGE } from './constants';
import { types } from './actionTypes';
import { parseRouteUrl } from './sitecoreRoutes';

export const checkBrowserComplete = params => ({
  type: types.SUPPORTED_BROWSER_CHECK_COMPLETED,
  payload: {
    supported: params.supported,
  },
});

export const fetchRouteData = (route, language, options = {}) => DataProvider.getRouteData(route, language, options);

const dispatchRoute = (dispatch, routeUrl, params) => {
  const routeParams = parseRouteUrl(routeUrl);
  if (!routeParams) {
    return;
  }

  if (routeParams.lang) {
    i18n.changeLanguage(routeParams.lang);
  }

  const route = routeParams.sitecoreRoute ? `/${routeParams.sitecoreRoute}` : '/';
  dispatch({
    type: sitecoreActionTypes.ROUTE_CHANGE_STARTED,
    payload: {
      path: route,
    },
  });

  const language = routeParams.lang || DEFAULT_LANGUAGE;
  fetchRouteData(route, language, params)
    .then((data) => {
      dispatch(push(routeUrl));
      dispatch({
        type: sitecoreActionTypes.ROUTE_CHANGE_COMPLETED,
        payload: {
          path: route,
          data,
          currentRoute: route,
          currentLang: routeParams.lang,
        },
      });
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          dispatch(push(NOT_FOUND_ROUTE));
        } else if (err.response.status === 500) {
          dispatch(push(SERVER_ERROR_ROUTE));
        }
      }
      console.error(err);
    });
};

// http://stackoverflow.com/a/27691108
const qsToObject = (qs) => {
  if (!qs) {
    return {};
  }
  return qs.substring(1).split('&')
    .reduce((result, next) => {
      const pair = next.split('=');
      const newResult = { [decodeURIComponent(pair[0])]: decodeURIComponent(pair[1]) };
      return newResult;
    }, {});
};

export const fetchInitialRoute = (path, querystring) => (dispatch) => {
  const params = qsToObject(querystring);
  dispatchRoute(dispatch, path, { params });
};

export const changeRoute = newRoute => (dispatch) => {
  if (isExperienceEditorActive()) {
    window.location.assign(newRoute);
    return;
  }

  if (newRoute === NOT_FOUND_ROUTE || newRoute === SERVER_ERROR_ROUTE) {
    return;
  }

  dispatchRoute(dispatch, newRoute);
};

export * from 'enhancers/commonActions';
