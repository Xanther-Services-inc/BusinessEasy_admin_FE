import actions from './actions';
import axios from 'axios'
import swal from 'sweetalert';


const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, registerBegin, registerSuccess, registerErr } = actions;

const login = (email, password) => {
  
  return async dispatch => {
    const body = {email, password}
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/b_manager/login`;
      dispatch(loginBegin());
      const {data} = await axios.post(url, body)
      if(typeof(data.token)!== "undefined"){
        dispatch(loginSuccess(data))
        localStorage.setItem("adminInfo", JSON.stringify(data))
        window.location.reload()
      } else {
        swal("Warning!!", "wrong Email or Password! Please Enter valid Email or Password.", "error")
        window.location.reload()
        return null
      }
      
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async dispatch => {
 
     
      localStorage.removeItem('adminInfo')
      dispatch(logoutSuccess());
    } 
    
  
};


const register = (firstName, lastName, email, phone, gender, country, password) => {
  return async dispatch => {
    const body = {firstName, lastName, email, phone, gender, country, password}
    try {

      dispatch(registerBegin());
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/super_user/register`, body)

      dispatch(registerSuccess(data))
      console.log('register success');
    } catch (err) {
      dispatch(registerErr(err));
    }
  };
};

export { login, logOut, register };
