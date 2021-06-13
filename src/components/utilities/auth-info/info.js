import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom'


const AuthInfo = () => {
  const history = useHistory()
  const { isLoggedIn } = useSelector(state => {
    return {
       
      isLoggedIn: state.auth.login || localStorage.getItem('adminInfo')
    };
  });

  var isLoggedInJsonObject = {}
  try {
 
    isLoggedInJsonObject = JSON.parse(isLoggedIn); 
} catch (e) {
   
    isLoggedInJsonObject = isLoggedIn;
}    
const decoded = jwt_decode(isLoggedInJsonObject.token)
    const email = decoded.email
    const user = isLoggedInJsonObject.user
    const type = isLoggedInJsonObject.type
    console.log(isLoggedInJsonObject);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
    history.push('/')
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <figcaption>
            <Heading as="h5">{user}</Heading>
            <p>{email}</p>
            <p>{type}</p>
          </figcaption>
        </figure>
        
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = value => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        <img src={require('../../../static/img/flag/english.png')} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        <img src={require('../../../static/img/flag/germany.png')} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        <img src={require('../../../static/img/flag/spain.png')} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        <img src={require('../../../static/img/flag/turky.png')} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>   

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar size="large" icon={<UserOutlined />} />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
