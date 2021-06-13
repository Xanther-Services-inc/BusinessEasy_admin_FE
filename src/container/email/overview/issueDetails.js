import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Progress, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, TaskLists } from '../../ecommerce/orders/style';

import { Main } from './styled'

import { Cards } from '../../../components/cards/frame/cards-frame'

import axios from 'axios'


const IssueDetails = ({ match }) => {



  const [issueDetails, setIssueDetails] = useState({})

  useEffect(() => {
    const fetchData = async () => {

       let {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/issue?id=${match.params.id}`)
      console.log('order details');
      console.log(data);
      setIssueDetails(data)
      }
      fetchData() 
    }, [])

    const {employee, order_id, id, issue_details, user_email, issue_category, title } = issueDetails




  const [empList, setEmpList] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

useEffect(() => {
  const fetchEmp = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/employee`)
  
    setEmpList(data)
  }
  fetchEmp()

}, [])

const issueEmpAssign = async (e) => {
  
const {value} = e.target


try{
    const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/issue/update`, {id: id, employee: value})
    swal("Congrates!", "Successfully Assigned Employee", "success")
    window.location.reload()
    console.log(id);
console.log(value);
console.log(startDate);
} catch(err) {
    console.log(err);
}

}

  return (
    <ProjectDetailsWrapper>
    
      <Main>
        <Row gutter={25}>
          
          <Col xxl={20} md={24} xl={24} xs={24}>
            <div className="about-project-wrapper">
              <Cards title="Issue Details">
                <div className="about-content">
                <p><strong>Issue Id: </strong>{id}</p>
                  <p><strong>Order Id: </strong>{order_id}</p>
                  <p><strong>Issue Title: </strong>{title}</p>
                  <p><strong>Issue Details: </strong>{issue_details}</p>
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
                    <span onClick={issueEmpAssign}>Assigned Employee -- 
                    <select>
                  {
                    empList ? empList.map((emp) => {
                  return (
                    <option key={emp.email} value={emp.email}>{emp.email}</option>
                    )
                   }) : null
                  }
                </select>
                    </span>
                    <p>{employee || 'NA'}</p>
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
