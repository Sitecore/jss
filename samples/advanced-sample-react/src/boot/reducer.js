/* eslint no-param-reassign: 0 */

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { sitecoreReducer } from '@sitecore-jss/sitecore-jss-react';

import about from 'about/reducer';
import app from 'app/reducer';
import home from 'home/reducer';
import services from 'services/reducer';
import portfolio from 'portfolio/reducer';
import downloadCallout from 'ui/components/downloadCallout/reducer';

export const makeRootReducer = asyncReducers =>
  combineReducers({
    about,
    app,
    home,
    services,
    portfolio,
    downloadCallout,
    sitecore: sitecoreReducer,
    model: (state = {}) => state,
    viewBag: (state = {}) => state,
    routing,
    ...asyncReducers,
  });

export default makeRootReducer;
