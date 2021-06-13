import actions from './actions';
import initialState from '../../demoData/orders.json';
import axios from 'axios'


const { filterOrderBegin, filterOrderSuccess, filterOrderErr, statusBegin, statusSuccess, statusErr } = actions;

const orderFilter = (column, value) => {
  return async dispatch => {
    try {
      dispatch(filterOrderBegin());

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders`)
      
      dispatch(filterOrderSuccess(data))

  } catch(err){
    dispatch(filterOrderErr(err))
  }
}
}

const orderStatusUpdate = (status, id) => {
  return async dispatch => {
    try {
      dispatch(statusBegin())

      const {statusData} = await axios.put(`${process.env.REACT_APP_API}/api/v1/order?id=${id}`, {status})

      dispatch(statusSuccess(statusData))
    } catch(err ){
      dispatch(statusErr(err))
    }
  }
}


export { orderFilter, orderStatusUpdate };
