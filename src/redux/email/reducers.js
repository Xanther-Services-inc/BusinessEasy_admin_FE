import actions from './actions';
import staticData from '../../demoData/emailData.json';

const {
  SINGLE_EMAIL_BEGIN,
  SINGLE_EMAIL_SUCCESS,
  SINGLE_EMAIL_ERR,
  STAR_UPDATE_BEGIN,
  STAR_UPDATE_SUCCESS,
  STAR_UPDATE_ERR,
  ALL_ISSUE_BEGIN,
  ALL_ISSUE_SUCCESS,
  ALL_ISSUE_ERR
} = actions;

const initialState = {
  data: staticData.allMessage,
  allMessage: staticData.allMessage,
  sLoading: false,
  loading: false,
  error: null,
};

const allIssueReducer = (state = [], action) => {
  const {type, data, err } = action;
  switch (type) {
    case ALL_ISSUE_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case ALL_ISSUE_SUCCESS:
      return {
        ...state,
        issues: data,
        isLoading: false
      };
      case ALL_ISSUE_ERR:
        return {
          ...state,
          isLoading: false,
          error: err
        };
      default:
        return state;
  }
}

const emailReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case STAR_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case STAR_UPDATE_SUCCESS:
      return {
        ...state,
        allMessage: data,
        sLoading: false,
      };
    case STAR_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

const SingleEmailReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SINGLE_EMAIL_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SINGLE_EMAIL_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SINGLE_EMAIL_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { SingleEmailReducer, emailReducer, allIssueReducer };
