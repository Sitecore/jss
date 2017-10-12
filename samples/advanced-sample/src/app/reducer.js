import { types } from './actionTypes';
import { actionTypes as sitecoreActionTypes } from '@sitecore-jss/sitecore-jss-react';
import { DEFAULT_LANGUAGE } from './constants';

const initialState = {
  loading: false,
  browserSupported: true,
  currentLang: DEFAULT_LANGUAGE,
  currentRoute: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_STARTED:
      return { ...state, loading: true };
    case types.INIT_COMPLETED:
      return { ...state, loading: false };
    case types.SUPPORTED_BROWSER_CHECK_COMPLETED:
      return { ...state, browserSupported: action.payload.supported };
    case sitecoreActionTypes.ROUTE_CHANGE_COMPLETED:
      var newState = { ...state };
      if (action.payload.currentLang) {
        newState.currentLang = action.payload.currentLang;
      }
      if (action.payload.currentRoute) {
        newState.currentRoute = action.payload.currentRoute;
      }
      return newState;
    default:
      return state;
  }
};

export default reducer;
