import { types } from './actionTypes';

const initialState = {
  loading: false,
  dynamicLoading: false,
  dynamicData: {},
  showDownloadForm: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_STARTED:
      return { ...state, loading: true };
    case types.INIT_COMPLETED:
      return { ...state, loading: false };
    case types.DYNAMIC_CONTENT_REQUEST_STARTED:
      return { ...state, dynamicLoading: true };
    case types.DYNAMIC_CONTENT_REQUEST_COMPLETED:
      return { ...state, dynamicLoading: false, dynamicData: action.payload.data };
    case types.DYNAMIC_CONTENT_REQUEST_FAILED:
      return { ...state, dynamicLoading: false };
    case types.DOWNLOAD_FORM_TOGGLE:
      return { ...state, showDownloadForm: action.payload.show };
    default:
      return state;
  }
};

export default reducer;
