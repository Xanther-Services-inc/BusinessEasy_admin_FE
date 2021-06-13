const actions = {
  SINGLE_EMAIL_BEGIN: 'SINGLE_EMAIL_BEGIN',
  SINGLE_EMAIL_SUCCESS: 'SINGLE_EMAIL_SUCCESS',
  SINGLE_EMAIL_ERR: 'SINGLE_EMAIL_ERR',

  STAR_UPDATE_BEGIN: 'STAR_UPDATE_BEGIN',
  STAR_UPDATE_SUCCESS: 'STAR_UPDATE_SUCCESS',
  STAR_UPDATE_ERR: 'STAR_UPDATE_ERR',

  ALL_ISSUE_BEGIN: 'ALL_ISSUE_BEGIN',
  ALL_ISSUE_SUCCESS: 'ALL_ISSUE_SUCCESS',
  ALL_ISSUE_ERR: 'ALL_ISSUE_ERR',
  
  allIssueBegin: () => {
    return {
      type: actions.ALL_ISSUE_BEGIN
    };
  },
  allIssueSuccess: (data) => {
    return {
      type: actions.ALL_ISSUE_SUCCESS,
      data
    };
  },
  allIssueErr: (err) => {
    return {
      type: actions.ALL_ISSUE_ERR,
      err
    };
  },

  starUpdateBegin: () => {
    return {
      type: actions.STAR_UPDATE_BEGIN,
    };
  },

  starUpdateSuccess: data => {
    return {
      type: actions.STAR_UPDATE_SUCCESS,
      data,
    };
  },

  starUpdateErr: err => {
    return {
      type: actions.STAR_UPDATE_ERR,
      err,
    };
  },

  singleEmailBegin: () => {
    return {
      type: actions.SINGLE_EMAIL_BEGIN,
    };
  },

  singleEmailSuccess: data => {
    return {
      type: actions.SINGLE_EMAIL_SUCCESS,
      data,
    };
  },

  singleEmailErr: err => {
    return {
      type: actions.SINGLE_EMAIL_ERR,
      err,
    };
  },
};

export default actions;
