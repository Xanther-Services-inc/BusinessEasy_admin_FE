import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
// import Heading from '../../../../components/heading/heading';

const ResetPassword = ({match}) => {
  let history = useHistory();
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    
    const url = `${process.env.REACT_APP_API}/api/v1/user/password/reset?token=${match.params.token}`;
  
    console.log(url);
    const proData = await Axios.patch(url, values).then((response) =>
          console.log(response)
      ).catch((error) => console.log(error))
      swal("Congratulation!", "Password Changed Successfully.", "success")
  
      history.push('/')
    }

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" form={form} onFinish={handleSubmit} layout="vertical">
          <h1 as="h3">Reset Password!</h1>
         
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: 'Please Enter new password!' }]}
          >
            <Input type='password' placeholder="xxxxxxx" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Change Password
            </Button>
          </Form.Item>
         
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
