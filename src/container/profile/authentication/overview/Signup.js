import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import {register} from '../../../../redux/authentication/actionCreator'
import { useDispatch, useSelector } from 'react-redux';


const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.auth.loading)
  const isData = useSelector(state => state.auth.data)
  const [state, setState] = useState({
    
    checked: null,
  });

  useEffect(() => {
    if(isData) {
      history.goBack()
    }
  }, [isData])

  const handleSubmit = (data) => {
    
    dispatch(register(data.firstName, data.lastName, data.email, data.phone, data.gender, data.country, data.password))
  };
  const onChange = checked => {
    setState({ ...state, checked });
  };
  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item label="firstName" name="firstName" rules={[{ required: true, message: 'Please input your First name!' }]}>
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item label="lastName" name="lastName" rules={[{ required: true, message: 'Please input your Last name!' }]}>
            <Input placeholder="Last name" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please Enter your Contact Number!' }]}>
            <Input placeholder="Contact Number" />
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please input your Gender!' }]}>

            <select>
            <option value=''>Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>

            </select>
          </Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please Enter your Country!' }]}>
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              Create Account
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login signin-social">
            <li>
              <a className="google-signup" href="/">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </a>
            </li>
            <li>
              <a className="facebook-sign" href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a className="twitter-sign" href="/">
                <TwitterOutlined />
              </a>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};
export default SignUp;