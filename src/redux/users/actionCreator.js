import actions from './actions';
import Axios from 'axios';


const { userDataBegin, userDataSuccess, userDataErr } = actions;

const userGetData = () => {
  return async dispatch => {
    try {
      dispatch(userDataBegin());
      const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/users`)
      console.log('team');
      console.log(data);
      dispatch(userDataSuccess(data));
    } catch (err) {
      dispatch(userDataErr(err));
    }
  };
};

export { userGetData };
