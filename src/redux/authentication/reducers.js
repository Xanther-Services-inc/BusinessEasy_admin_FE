import actions from './actions';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR, LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR, REGISTER_BEGIN, REGISTER_SUCCESS, REGISTER_ERR } = actions;

const initState = {
  login: localStorage.getItem('adminInfo'),
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return { };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
      case REGISTER_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          data: data,
          loading: false,
        };
      case REGISTER_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };
    default:
      return state;
  }
};
export default AuthReducer;

