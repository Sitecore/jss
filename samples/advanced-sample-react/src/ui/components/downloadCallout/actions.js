import SitecoreContentService from '../../../SitecoreContentService';
import { types } from './actionTypes';

export * from '../../../enhancers/commonActions';

export const showDownloadForm = (contentRoute, language) => (dispatch) => {
  dispatch({
    type: types.CONTENT_REQUEST_STARTED,
    payload: {
      route: contentRoute,
    },
  });

  SitecoreContentService.getItemData(contentRoute, language)
    .then((data) => {
      dispatch({
        type: types.CONTENT_REQUEST_COMPLETED,
        payload: {
          route: contentRoute,
          data,
        },
      });
      dispatch({
        type: types.VISIBILITY_TOGGLED,
        payload: {
          show: true,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.CONTENT_REQUEST_FAILED,
        payload: err,
        error: true,
      });
      console.error(err);
    });
};

export const hideDownloadForm = () => ({
  type: types.VISIBILITY_TOGGLED,
  payload: {
    show: false,
  },
});
