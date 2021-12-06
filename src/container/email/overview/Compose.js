import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import RichTextEditor from 'react-rte';
import { Form, Input, Button, Select } from 'antd';
import propTypes from 'prop-types';
import { MailBox } from './style';
import MailComposer from './MailComposer';
import Axios from 'axios';

const Compose = ({ close }) => {
  const [state, setState] = useState({
    value: RichTextEditor.createEmptyValue(),
    tags: [],
    size: 'small',
  });

  const onChange = value => {
    setState({ ...state, value });
  };

  const toggleSize = () => {
    return setState({
      ...state,
      size: state.size === 'small' ? 'big' : 'small',
    });
  };

  const onMailSend = async () => {
    // hit the mail sender api
  };
  // new
  const [category, setcategory] = useState('')
const handleChange = (value) => {
  setcategory(value)
  console.log(value);
}

  const handleSubmit = async (values) => {

    const order_id = values.order_id
    const user_email = values.email
    const issue_details = values.details
    const issue_category = category
    const title = values.title
   

    const url = `${process.env.REACT_APP_API}/api/v1/issue`;
  
    const composeData = await Axios.post(url, {details:issue_details, order_id:order_id, issue_category: issue_category, email: user_email, title: title}).then((response) =>
    console.log(response)
  ).catch((error) => console.log(error))
  window.location.reload();
  
  }
  const [form] = Form.useForm();
 
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 10 },
  };


  return (
    <MailBox style={{height: "80vh", top: "7rem"}} size={state.size}>
    <h4 style={{padding: '4px', textAlign: 'center', marginTop: '20px'}}><strong>Submit an Issue</strong></h4>
    <Form {...layout} style={{margin: '5px'}} form={form} name="control-hooks" onFinish={handleSubmit}>
    <Form.Item style={{marginLeft: '1rem'}} name='order_id'  rules={[{ required: true }]}>
    <Input style={{paddingLeft: '1rem'}} placeholder='Order Id' />
        </Form.Item>
        <Form.Item style={{marginLeft: '1rem'}} name='email' rules={[{ required: true }]}>
    <Input style={{paddingLeft: '1rem'}} placeholder='User Email' />
        </Form.Item>
        <Form.Item style={{marginLeft: '1rem'}} name='title' rules={[{ required: true }]}>
    <Input style={{paddingLeft: '1rem'}} placeholder='Issue Title' />
        </Form.Item>
        {/* <Form.Item style={{marginLeft: '1rem'}} name='issue_category' rules={[{ required: true }]}>
        <Select style={{paddingLeft: '1rem'}} defaultValue="" onChange={handleChange}>
          <Select.Option value=''>Issue Category</Select.Option>
          <Select.Option value='Issue 1'>Issue 1</Select.Option>
          <Select.Option value='Issue 2'>Issue 2</Select.Option>
          <Select.Option value='Issue 3'>Issue 3</Select.Option>
        </Select>
        </Form.Item> */}
        <Form.Item style={{marginLeft: '1rem'}} name='details' rules={[{ required: true }]}>
        <Input.TextArea style={{paddingLeft: '1rem'}} rows={3} placeholder='Issue Details' />
        </Form.Item>
        <Form.Item style={{textAlign: 'center'}} {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Form.Item>
    </Form> 
    </MailBox>
  );
};

Compose.propTypes = {
  close: propTypes.func,
};

Compose.defaultProps = {
  close: () => {},
};

export default Compose;
