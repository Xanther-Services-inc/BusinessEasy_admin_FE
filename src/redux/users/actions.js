const actions = {
    USER_DATA_BEGIN: 'USER_DATA_BEGIN',
    USER_DATA_SUCCESS: 'USER_DATA_SUCCESS',
    USER_DATA_ERR: 'USER_DATA_ERR',
  
    
    userDataBegin: () => {
      return {
        type: actions.USER_DATA_BEGIN,
      };
    },
  
    userDataSuccess: data => {
      return {
        type: actions.USER_DATA_SUCCESS,
        data,
      };
    },
  
    userDataErr: err => {
      return {
        type: actions.USER_DATA_ERR,
        err,
      };
    },
  };
  
  export default actions;
  