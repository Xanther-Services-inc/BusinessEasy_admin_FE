import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Progress, Spin, Steps } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, TaskLists } from './style';
import FileListCard from './FileListCard';
import { Main } from './styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import swal from 'sweetalert';
import Select from 'react-dropdown-select';
var _ = require('lodash');

const { Step } = Steps;

const ProjectDetails = ({ match }) => {
  const userLogin = useSelector(state => state.auth);
  const { login } = userLogin;

  const [empList, setEmpList] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchEmp = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/employee`);

      setEmpList(data);
    };
    fetchEmp();
  }, []);

  console.log(empList);

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order?id=${match.params.id}`);

      console.log(data);
      setOrderDetails(data);
    };
    fetchData();
  }, []);

  var {
    id,
    email,
    payment,
    price,
    order_status,
    startDate,
    emp_assigned,
    payment_id,
    product_id,
    order_steps,
  } = orderDetails;

  console.log(orderDetails);

  order_steps = order_steps ? order_steps.split(',') : [];

  const image = _.get(orderDetails, 'image');
  const order_data = _.get(orderDetails, 'order_data');

  console.log(orderDetails);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessage = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/messages?order_id=${match.params.id}`);
      console.log('message', data);
      setMessages(data);
    };
    fetchMessage();
  }, []);

  console.log(messages);

  const [form] = Form.useForm();
  const [fileName, setFileName] = useState('');
  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  };

  const handleSubmit = async values => {
    var fd = new FormData();
    fd.append('message', values.message);
    fd.append('order_id', id);
    fd.append('img', fileName);
    fd.append('user', 'Employee');

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const url = `${process.env.REACT_APP_API}/api/v1/message/send`;
    console.log(fileName);
    const { data } = await axios.post(
      url,
      { message: values.message, order_id: id, img: fileName, user: 'Employee' },
      config,
    );
    window.location.reload();
  };

  const rightMessage = {
    textAlign: 'right',
    paddingRight: '1rem',
  };

  const leftMessage = {
    textAlign: 'left',
    marginLeft: '10px',
  };

  // Employee assign select option

  let arr = [];
  const empOptions = empList
    ? empList.map(emp => arr.push({ value: emp.email, label: emp.email }))
    : [{ value: 'No Emp', label: 'No Emp' }];

  // State for Emp
  const [emp, setEmp] = useState('NA');
  const orderEmpAssign = async values => {
    setEmp(values[0].value);
  };

  const handleOrderEmpAssign = async () => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/emp-assign`, {
        id: id,
        startDate: startDate,
        employee: emp,
      });
      swal('Congrates!', 'Successfully Assigned Employee', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Payment status change select options
  const paymentOptions = [
    { value: 'Due', label: 'Due' },
    { value: 'Paid', label: 'Paid' },
  ];

  const [paymentStatus, setPaymentStatus] = useState('NA');
  const paymentStatusChange = async values => {
    setPaymentStatus(values[0].value);
  };

  const handlePaymentStatus = async () => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/payment-status`, {
        id: id,
        startDate: startDate,
        payment: paymentStatus,
      });
      swal('Congrates!', 'Successfully Changed Payment Status', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // OrderStatus change select options
  const statusOptions = [];

  if (order_steps) {
    order_steps.map(step => {
      return statusOptions.push({
        value: step,
        label: step,
      });
    });
  }
  console.log(order_steps);

  console.log(statusOptions);
  // const statusOptions = [
  //   { value: 'Pending', label: 'Pending' },
  //   { value: 'In Progress', label: 'In Progress' },
  //   { value: 'Completed', label: 'Completed' },
  // ];

  const [OrderStatus, setOrderStatus] = useState('');

  const handleOrderStatusChange = async values => {
    setOrderStatus(values[0].value);
  };

  const handleOrderStatus = async () => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/order-status`, {
        id: id,
        startDate: startDate,
        status: OrderStatus,
      });
      swal('Congrates!', 'Successfully Changed Order Status', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const details = [];
  for (let [key, value] of Object.entries(order_data ? order_data : {})) {
    details.push([key, value]);
  }

  console.log(order_data);

  console.log(details);

  // Export to csv file
  const handleCSV = async id => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/export-single-order?id=${id}`);
    window.location.href = data.msg;
  };

  return (
    <ProjectDetailsWrapper>
      <Button style={{ display: 'flex', left: '70vw', margin: '10px 0' }} type="primary" onClick={() => handleCSV(id)}>
        Export
      </Button>

      <Main>
        <Row gutter={25}>
          <Col xxl={6} xl={8} xs={24}>
            <Cards headless>
              <h3>Customer Details</h3>
              <hr />
              <h3>
                <strong>Email:</strong> {email}
              </h3>
              <div className="state-single">
                <div>
                  <h3>
                    {details &&
                      details.map(item => {
                        return (
                          <h4>
                            <strong>{item[0]}:</strong> {item[1]}
                          </h4>
                        );
                      })}
                  </h3>
                </div>
              </div>
            </Cards>
            {/* new */}
            <Cards headless>
              <h3>Make a Conversation</h3>
              <hr />
              <Form onFinish={handleSubmit} form={form}>
                <Row gutter={30}>
                  <Col md={20} xs={20}>
                    <Form.Item name="message">
                      <Input placeholder="Type your message.." />
                    </Form.Item>
                  </Col>
                  <Col md={20} xs={20}>
                    <input fileName="image" name="img" onChange={onChangeFile} type="file" />
                    <br />
                  </Col>
                </Row>
                <div className="sDash_form-action mt-20">
                  <Button htmlType="submit" type="primary" size="large">
                    Send
                  </Button>
                </div>
              </Form>
            </Cards>
            {/* new */}
            {/* new */}
            <Cards title="Conversations">
              <Scrollbars
                style={{
                  width: '21rem',
                  height: '20rem',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              >
                {messages &&
                  messages.map(message => (
                    <>
                      <div style={message.user === 'Employee' ? rightMessage : leftMessage}>
                        <div>
                          <p style={{ color: '#0a8dff' }}>@{message.user}</p>
                          {message.message !== 'undefined' ? <p>{message.message}</p> : null}

                          {message.doc_key && message.doc_key !== 'sample.jpg' ? (
                            <Link
                              to={{ pathname: `https://order-message.s3.us-east-2.amazonaws.com/${message.doc_key}` }}
                              target="_blank"
                            >
                              <img
                                src={`https://order-message.s3.us-east-2.amazonaws.com/${message.doc_key}`}
                                style={{ height: '7rem', width: '60%' }}
                              ></img>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                      <br />
                    </>
                  ))}
              </Scrollbars>
            </Cards>
            {/* new */}
          </Col>
          <Col xxl={12} xl={16} xs={24}>
            <div className="about-project-wrapper">
              <Cards title="Order Details">
                <div className="about-content">
                  <p>Order Id: {id}</p>
                  <p>Product: {product_id}</p>
                  <p>Price: 💰 {price}</p>
                  <div>
                    <p>Payment: {payment}</p>
                    <span>
                      <Select
                        options={paymentOptions}
                        onChange={paymentStatusChange}
                        style={{ width: 150, left: 0, right: 0 }}
                      />
                    </span>
                    {paymentStatus !== 'NA' ? (
                      <Button style={{ marginTop: '4px' }} onClick={handlePaymentStatus} type="primary">
                        Change
                      </Button>
                    ) : (
                      <Button style={{ marginTop: '4px' }} type="primary" disabled>
                        Change
                      </Button>
                    )}
                  </div>
                  <p>Payment Id: {payment_id || 'NA'}</p>
                </div>
                <span className="ordered-date">
                  Assign employee: {emp_assigned} <br />
                </span>
                <span>
                  <Select options={arr} onChange={orderEmpAssign} style={{ width: 300, left: 0, right: 0 }} />
                  {emp !== 'NA' ? (
                    <Button style={{ marginTop: '4px' }} onClick={handleOrderEmpAssign} type="primary">
                      Assign
                    </Button>
                  ) : (
                    <Button style={{ marginTop: '4px' }} type="primary" disabled>
                      Assign
                    </Button>
                  )}
                </span>
                <div className="about-project">
                  <div>
                    <span>Start Date</span>
                    <p className="color-primary">{startDate}</p>
                  </div>

                  <div>
                    <span>Status</span>
                    <p className="color-danger">{order_status}</p>
                    <span>
                      <Select
                        style={{ width: 150, left: -100, right: 0 }}
                        options={statusOptions}
                        onChange={handleOrderStatusChange}
                      />
                    </span>
                    {OrderStatus ? (
                      <Button style={{ marginTop: '4px' }} onClick={handleOrderStatus} type="primary">
                        Change
                      </Button>
                    ) : (
                      <Button style={{ marginTop: '4px' }} type="primary" disabled>
                        Change
                      </Button>
                    )}
                  </div>
                </div>
                {/* Order Steps  */}
                <Steps size="small" current={order_steps ? order_steps.indexOf(order_status) : 0}>
                  {order_steps &&
                    order_steps.map(step => {
                      return <Step title={step} />;
                    })}
                </Steps>
                {/* Order Steps  */}
              </Cards>
              <div>
                <h3>Attached Documents</h3>

                {image ? image.map(doc => <FileListCard key={doc} doc={doc} />) : []}
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </ProjectDetailsWrapper>
  );
};

ProjectDetails.propTypes = {
  match: propTypes.object,
};

export default ProjectDetails;
