import actions from './actions';


const initialState = {
  data: [],
  loading: false,
  error: null,
};
const { TEAM_DATA_BEGIN, TEAM_DATA_SUCCESS, TEAM_DATA_ERR, TEAM_DETAILS_BEGIN, TEAM_DETAILS_SUCCESS, TEAM_DETAILS_ERR } = actions;

const teamDetailsReducer = (state=initialState, action) => {
  const {type, data, err} = action;
  switch(type) {
    case TEAM_DETAILS_BEGIN:
      return {
        ...state,
        loading: true
      };
      case TEAM_DETAILS_SUCCESS:
      return {
        ...state,
        data:data,
        loading: false,
      };
    case TEAM_DETAILS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
}

const teamReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case TEAM_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case TEAM_DATA_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case TEAM_DATA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};



export { teamReducer, teamDetailsReducer };
