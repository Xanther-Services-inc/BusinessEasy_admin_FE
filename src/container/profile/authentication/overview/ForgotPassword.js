import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import swal from 'sweetalert'

const ForgotPassword = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    
    const url = `${process.env.REACT_APP_API}/api/v1/user/reset-password-mail`;
  
    const proData = await Axios.post(url, values).then((response) =>
          console.log(response)
      ).catch((error) => console.log(error))
      swal("Congratulation!", "Mail send successfully.", "success")
  
      history.push('/')
    }

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Forgot Password?</Heading>
          <p className="forgot-text">
            Enter the email address you used when you joined and we’ll send you instructions to reset your password.
          </p>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Send Reset Instructions
            </Button>
          </Form.Item>
          <p className="return-text">
            Return to <NavLink to="/">Sign In</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
