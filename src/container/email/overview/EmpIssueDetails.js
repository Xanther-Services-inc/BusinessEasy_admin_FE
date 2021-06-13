import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Progress, Spin } from 'antd';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, TaskLists } from '../../ecommerce/orders/style';

import { Main } from './styled'

import { Cards } from '../../../components/cards/frame/cards-frame'

import axios from 'axios'


const EmpIssueDetails = ({ match }) => {



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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


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
                    <span>Assigned Employee</span>
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

EmpIssueDetails.propTypes = {
  match: propTypes.object,
};

export default EmpIssueDetails;
