import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Progress, Spin } from 'antd';
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

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order?id=${match.params.id}`);

      setOrderDetails(data);
    };
    fetchData();
  }, []);

  const {
    firstName,
    lastName,
    zip,
    endDate,
    dueDate,
    startDate,
    status,
    email,
    doc_key,
    country,
    product_id,
    price,
    payment,
    payment_id,
    gender,
    state,
    city,
    emp_assigned,
    dob,
    id,
    phone,
    pan,
  } = orderDetails;

  console.log(startDate);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/messages?order_id=${match.params.id}`);
      console.log('message', data);
      setMessages(data);
    };
    fetchMessage();
  }, []);

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
      headers: { 'content-type': 'multipart/form-data' },
    };

    const url = `${process.env.REACT_APP_API}/api/v1/message/send`;

    const { data } = await axios.post(url, fd, config);
    window.location.reload();
  };

  const rightMessage = {
    textAlign: 'right',
    paddingRight: '10px',
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

  const orderEmpAssign = async values => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/emp-assign`, {
        id: id,
        startDate: startDate,
        employee: values[0].value,
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

  const paymentStatusChange = async values => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/payment-status`, {
        id: id,
        startDate: startDate,
        payment: values[0].value,
      });
      swal('Congrates!', 'Successfully Changed Payment Status', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // OrderStatus change select options
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const handleOrderStatusChange = async values => {
    // console.log(values[0].value);

    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/order-status`, {
        id: id,
        startDate: startDate,
        status: values[0].value,
      });
      swal('Congrates!', 'Successfully Changed Order Status', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProjectDetailsWrapper>
      <Main>
        <Row gutter={25}>
          <Col xxl={6} xl={8} xs={24}>
            <Cards headless>
              <h3>Customer Details</h3>
              <hr />
              <div className="state-single">
                <div className="color-secondary">
                  <FeatherIcon icon="user" size={25} />
                </div>
                <div>
                  <h5>
                    <strong>{firstName + ' ' + lastName + ' [' + gender + ']'}</strong>
                  </h5>
                </div>
              </div>
              <div className="state-single">
                <div className="color-secondary">
                  <FeatherIcon icon="map-pin" size={25} />
                </div>

                <div>
                  <p>{city + ', ' + state + ', ' + zip + ', ' + country}</p>
                </div>
              </div>
              <div className="state-single">
                <div className="color-secondary">
                  <FeatherIcon icon="credit-card" size={25} />
                </div>

                <div>
                  <p>PAN: {pan}</p>
                </div>
              </div>
              <div className="state-single">
                <div className="color-warning">
                  <FeatherIcon icon="calendar" size={25} />
                </div>
                <div>
                  <p>{dob}</p>
                </div>
              </div>
              <div className="state-single">
                <div className="color-warning">
                  <FeatherIcon icon="at-sign" size={25} />
                </div>
                <div>
                  <p>{email}</p>
                </div>
              </div>
              <div className="state-single">
                <div className="color-warning">
                  <FeatherIcon icon="phone" size={25} />
                </div>
                <div>
                  <p>{phone}</p>
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
                  </div>
                  <p>Payment Id: {payment_id || 'NA'}</p>
                </div>
                <span className="ordered-date">
                  Assign employee: {emp_assigned} <br />
                </span>
                <span>
                  <Select options={arr} onChange={orderEmpAssign} style={{ width: 300, left: 0, right: 0 }} />
                </span>
                <div className="about-project">
                  <div>
                    <span>Ordered by</span>
                    <p>{firstName + ' ' + lastName}</p>
                  </div>
                  <div>
                    <span>Due Date</span>
                    <p>{dueDate || 'NA'}</p>
                  </div>
                  <div>
                    <span>Start Date</span>
                    <p className="color-primary">{startDate}</p>
                  </div>
                  <div>
                    <span>Deadline</span>
                    <p className="color-danger">{endDate || 'NA'}</p>
                  </div>
                  <div>
                    <span>Status</span>
                    <p className="color-danger">{status}</p>
                    <span>
                      <Select
                        style={{ width: 150, left: -100, right: 0 }}
                        options={statusOptions}
                        onChange={handleOrderStatusChange}
                      />
                    </span>
                  </div>
                  {/* <br />
                  <div>
                    <span>Assigned Employee</span>
                    <p className="color-danger">{emp_assigned || 'NA'}</p>
                  </div> */}
                </div>
              </Cards>
              <div>
                <h3>Attached Documents</h3>

                {doc_key ? doc_key.map(doc => <FileListCard key={doc} doc={doc} />) : []}
              </div>
              {/* new */}
              <Cards title="Conversations">
                <Scrollbars
                  style={{
                    width: 500,
                    height: 300,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  }}
                >
                  {messages.map(message => (
                    <>
                      <div style={message.user === 'Employee' ? rightMessage : leftMessage}>
                        <div>
                          <p style={{ color: '#0a8dff' }}>@{message.user}</p>
                          {message.message !== 'undefined' ? <h5>{message.message}</h5> : null}

                          {message.doc_key !== 'sample.jpg' ? (
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
