import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select } from 'antd';
import swal from 'sweetalert';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import Axios from 'axios';


const { Option } = Select;
const BInfo = () => {
  const [state, setState] = useState({
    values: '',
  });
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    
    const {data } = await Axios.post(`${process.env.REACT_APP_API}/api/v1/b_manager/register`, values)

          swal("Congrates!", "Employee Added Successfully.", "success")

    window.location.reload()
     console.log(values);
    
  };

  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
              <Heading className="form-title" as="h4">
                Personal Information
              </Heading>

              <figure className="photo-upload align-center-v">
                {/* <img src={require('../../../static/img/avatar/profileImage.png')} alt="" />
                <figcaption>
                  <Upload>
                    <Link className="btn-upload" to="#">
                      <FeatherIcon icon="camera" size={16} />
                    </Link>
                  </Upload>
                  <div className="info">
                    <Heading as="h4">Profile Photo</Heading>
                  </div>
                </figcaption> */}
              </figure>

              <Form.Item label="First Name" name="firstName">
                <Input placeholder="Input Name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <Input placeholder="Input Name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item label="Password" name="password" type="password">
                <Input.Password />
              </Form.Item>
              

              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+440 2546 5236" />
              </Form.Item>

              <Form.Item name="country" initialValue="" label="Country">
              <Input placeholder="Enter Country" />
              </Form.Item>

              <Form.Item initialValue="" name="gender" label="gender">
                <Select style={{ width: '100%' }}>
                  <Option value="">Please Select</Option>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              

              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      return form.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button htmlType="submit" type="primary">
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
};

export default BInfo;