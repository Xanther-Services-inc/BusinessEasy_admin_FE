import React from 'react'
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import AssignedProject from './overview/AssignedProject.Component'


const EmpProjects = () => {
    const { isLoggedIn } = useSelector(state => {
        return {
           
          isLoggedIn: state.auth.login || localStorage.getItem('adminInfo')
        };
      });
      console.log(isLoggedIn)
      var isLoggedInJsonObject = {}
      try {
        isLoggedInJsonObject = JSON.parse(isLoggedIn); 
    } catch (e) {
    
        isLoggedInJsonObject = isLoggedIn;
    }    
    const decoded = jwt_decode(isLoggedInJsonObject.token)
    const email = decoded.email

    const orderStyle = {
        margin: 5,

    }
    return (
        <div style={orderStyle}>

            <AssignedProject email={email} />
        </div>
    )
}

export default EmpProjects