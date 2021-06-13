const actions = {
  FILTER_ORDER_BEGIN: 'FILTER_ORDER_BEGIN',
  FILTER_ORDER_SUCCESS: 'FILTER_ORDER_SUCCESS',
  FILTER_ORDER_ERR: 'FILTER_ORDER_ERR',
  STATUS_BEGIN: 'STATUS_BEGIN',
  STATUS_SUCCESS: 'STATUS_SUCCESS',
  STATUS_ERR: 'STATUS_ERR',

  filterOrderBegin: () => {
    return {
      type: actions.FILTER_ORDER_BEGIN,
    };
  },

  
  filterOrderSuccess: data => {
    return {
      type: actions.FILTER_ORDER_SUCCESS,
      data,
    };
  },

  filterOrderErr: err => {
    return {
      type: actions.FILTER_ORDER_ERR,
      err,
    };
  },

  statusBegin: () => {
    return {
      type: actions.STATUS_BEGIN
    }
  },

  statusSuccess: (data) => {
    return {
      type: actions.STATUS_SUCCESS,
      data
    }
  },

  statusErr: (err) => {
    return {
      type: actions.statusSuccess,
      err
    }
  }


};

export default actions;
