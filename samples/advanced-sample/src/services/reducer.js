import { types } from './actionTypes';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_STARTED:
      return { ...state, loading: true };
    case types.INIT_COMPLETED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
