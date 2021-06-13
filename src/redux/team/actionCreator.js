import actions from './actions';
import Axios from 'axios';


const { teamDataBegin, teamDataSuccess, teamDataErr, teamDetailsBegin, teamDetailsSuccess, temaDetailsErr } = actions;

const teamGetDetails = (email) => {
  return async dispatch => {
    try {
      dispatch(teamDetailsBegin());
      const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/dash/single?email=${email}`)
      console.log('team');
      console.log(data);
      dispatch(teamDetailsSuccess(data));
    } catch (err) {
      dispatch(teamDetailsErr(err));
    }
  };
};


const teamGetData = () => {
  return async dispatch => {
    try {
      dispatch(teamDataBegin());
      const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/getAllEmp`)
      console.log('team');
      console.log(data);
      dispatch(teamDataSuccess(data));
    } catch (err) {
      dispatch(teamDataErr(err));
    }
  };
};

export { teamGetData, teamGetDetails };
