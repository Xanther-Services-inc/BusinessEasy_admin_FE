import actions from './actions';


const initialState = {
  data: [],
  loading: false,
  error: null,
};
const { USER_DATA_BEGIN, USER_DATA_SUCCESS, USER_DATA_ERR } = actions;
const userReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case USER_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case USER_DATA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { userReducer };
