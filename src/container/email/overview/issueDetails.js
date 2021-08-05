import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Progress, Spin, Button } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, TaskLists } from '../../ecommerce/orders/style';
import Select from 'react-dropdown-select';
import { Main } from './styled';

import { Cards } from '../../../components/cards/frame/cards-frame';

import axios from 'axios';

const IssueDetails = ({ match }) => {
  const [issueDetails, setIssueDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/issue?id=${match.params.id}`);
      console.log('order details');
      console.log(data);
      setIssueDetails(data);
    };
    fetchData();
  }, []);

  const { employee, order_id, id, issue_details, user_email, issue_category, title } = issueDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  Issue Employee assign
  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    const fetchEmp = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/employee`);

      setEmpList(data);
    };
    fetchEmp();
  }, []);

  let arr = [];
  const empOptions = empList
    ? empList.map(emp => arr.push({ value: emp.email, label: emp.email }))
    : [{ value: 'No Emp', label: 'No Emp' }];

  const [emp, setEmp] = useState('NA');

  const issueEmpAssign = async values => {
    setEmp(values[0].value);
  };

  const handleEmpAssign = async () => {
    try {
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/issue/update`, {
        id: id,
        employee: emp,
      });
      swal('Congrates!', 'Successfully Assigned Employee', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Export to csv file
  const handleCSV = async id => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/issue/export-single-issue?id=${id}`);
    window.location.href = data.msg;
  };

  return (
    <ProjectDetailsWrapper>
      <Button style={{ display: 'flex', left: '70vw', margin: '10px 0' }} type="primary" onClick={() => handleCSV(id)}>
        Export
      </Button>
      <Main>
        <Row gutter={25}>
          <Col xxl={20} md={24} xl={24} xs={24}>
            <div className="about-project-wrapper">
              <Cards title="Issue Details">
                <div className="about-content">
                  <p>
                    <strong>Issue Id: </strong>
                    {id}
                  </p>
                  <p>
                    <strong>Order Id: </strong>
                    {order_id}
                  </p>
                  <p>
                    <strong>Issue Title: </strong>
                    {title}
                  </p>
                  <p>
                    <strong>Issue Details: </strong>
                    {issue_details}
                  </p>
                </div>
                <div className="about-project">
                  <div>
                    <span>User</span>
                    <p>{user_email}</p>
                  </div>

                  <div>
                    <span>Issue Type</span>
                    <p>{issue_category}</p>
                  </div>
                  <div>
                    <span>Assigned Employee --</span>
                    <p>{employee || 'NA'}</p>
                    <Select options={arr} onChange={issueEmpAssign} style={{ width: 250, left: -100, right: 0 }} />
                    {emp !== 'NA' ? (
                      <Button style={{ marginTop: '4px' }} onClick={handleEmpAssign} type="primary">
                        Change
                      </Button>
                    ) : (
                      <Button style={{ marginTop: '4px' }} type="primary" disabled>
                        Change
                      </Button>
                    )}
                  </div>
                </div>
              </Cards>
            </div>
          </Col>
        </Row>
      </Main>
    </ProjectDetailsWrapper>
  );
};

IssueDetails.propTypes = {
  match: propTypes.object,
};

export default IssueDetails;
