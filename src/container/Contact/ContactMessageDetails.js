import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Progress, Spin } from 'antd';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, TaskLists } from '../../container/ecommerce/orders/style';

import { Main } from '../email/overview/styled'

import { Cards } from '../../components/cards/frame/cards-frame'

import axios from 'axios'


const ContactMessageDetails = ({ match }) => {



  const [messageDetails, setMessageDetails] = useState({})

  useEffect(() => {
    const fetchData = async () => {

       let {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/contact/message?id=${match.params.id}`)
      
      console.log(data);
      setMessageDetails(data)
      }
      fetchData() 
    }, [])

    const {firstName, lastName, email, phone, message } = messageDetails

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <ProjectDetailsWrapper>
    
      <Main>
        <Row gutter={25}>
          
          <Col xxl={20} md={24} xl={24} xs={24}>
            <div className="about-project-wrapper">
              <Cards title="Message Details">
                <div className="about-content">
                <p><strong>Name: </strong>{firstName + ' ' + lastName}</p>
                  <p><strong>Email: </strong>{email}</p>
                  <p><strong>Phone Number: </strong>{phone}</p>
                  <p><strong>Message: </strong>{message}</p>
                </div>
                </Cards>
            </div>
          </Col>
          
        </Row>
      </Main>
    </ProjectDetailsWrapper>
  );
};

ContactMessageDetails.propTypes = {
  match: propTypes.object,
};

export default ContactMessageDetails;
