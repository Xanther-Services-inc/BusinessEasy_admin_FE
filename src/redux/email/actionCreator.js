import actions from './actions';
import initialState from '../../demoData/emailData.json';
import Axios from 'axios';

const {
  singleEmailBegin,
  singleEmailSuccess,
  singleEmailErr,
  starUpdateBegin,
  starUpdateSuccess,
  starUpdateErr,
  allIssueBegin,
  allIssueSuccess,
  allIssueErr
} = actions;

const getAllIssue = () => {
  return async dispatch => {
    try{
      dispatch(allIssueBegin())
      const {data} = Axios.get(`${process.env.REACT_APP_API}/api/v1/orders`)
      console.log('issue', data);
      dispatch(allIssueSuccess(data))
    } catch(err ){
      dispatch(allIssueErr(err))
    }
  }
}

const filterSinglePage = paramsId => {
  return async dispatch => {
    try {
      dispatch(singleEmailBegin());
      const data = initialState.allMessage.filter(email => {
        return email.id === paramsId;
      });
      dispatch(singleEmailSuccess(data));
    } catch (err) {
      dispatch(singleEmailErr(err));
    }
  };
};

const onStarUpdate = id => {
  return async dispatch => {
    try {
      dispatch(starUpdateBegin());
      initialState.allMessage.map(email => {
        if (email.id === id) {
          return email.stared ? (email.stared = false) : (email.stared = true);
        }
        return dispatch(starUpdateSuccess(initialState.allMessage));
      });
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onSortingAscending = () => {
  return async dispatch => {
    try {
      dispatch(starUpdateBegin());
      const data = initialState.allMessage.sort((a, b) => {
        return parseInt(b.id, 10) - parseInt(a.id, 10);
      });
      dispatch(starUpdateSuccess(data));
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onSortingDescending = () => {
  return async dispatch => {
    try {
      dispatch(starUpdateBegin());
      const data = initialState.allMessage.sort((a, b) => {
        return parseInt(a.id, 10) - parseInt(b.id, 10);
      });
      dispatch(starUpdateSuccess(data));
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

export { filterSinglePage, getAllIssue, onStarUpdate, onSortingAscending, onSortingDescending };
