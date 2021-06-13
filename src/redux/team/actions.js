const actions = {
  TEAM_DATA_BEGIN: 'TEAM_DATA_BEGIN',
  TEAM_DATA_SUCCESS: 'TEAM_DATA_SUCCESS',
  TEAM_DATA_ERR: 'TEAM_DATA_ERR',
  TEAM_DETAILS_BEGIN: 'TEAM_DETAILS_BEGIN',
  TEAM_DETAILS_SUCCESS: 'TEAM_DETAILS_SUCCESS',
  TEAM_DETAILS_ERR: 'TEAM_DETAILS_ERR',

  
  teamDetailsBegin: () => {
    return {
      type: actions.TEAM_DETAILS_BEGIN
    };
  },
  teamDetailsSuccess: (data) => {
    return {
      type: actions.TEAM_DETAILS_SUCCESS,
      data
    };
  },
  temaDetailsErr: err => {
    return {
      type: actions.TEAM_DETAILS_ERR,
      err
    };
  },

  teamDataBegin: () => {
    return {
      type: actions.TEAM_DATA_BEGIN,
    };
  },

  teamDataSuccess: data => {
    return {
      type: actions.TEAM_DATA_SUCCESS,
      data,
    };
  },

  teamDataErr: err => {
    return {
      type: actions.TEAM_DATA_ERR,
      err,
    };
  },
};

export default actions;
