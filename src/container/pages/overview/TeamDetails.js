import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col,Skeleton, Card, Tag, Form, Input, Button, Progress, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, ProjectCard } from '../../ecommerce/orders/style';
import { Main } from '../../ecommerce/orders/styled'
import { Cards } from '../../../components/cards/frame/cards-frame'
import axios from 'axios'
import {teamGetDetails} from '../../../redux/team/actionCreator'
import {Bar} from 'react-chartjs-2'
import AssignedProject from './AssignedProject.Component';
import AssigedIssue from '../../email/AssignedIssues.component'

const UserDetails = ({ match }) => {
    const dispatch = useDispatch()
  const teamDetails = useSelector((state) => state.teamDetails)

  const {loading, data, err} = teamDetails

  console.log('data',data);

  useEffect(() => {
    window.scrollTo(0,0);
 }, [])

  useEffect(() => {
    dispatch(teamGetDetails(match.params.email))
  }, [])
    // const [user, setUser] = useState({})
    
    // useEffect(() => {
    //     const fetchData = async () => {
            
    //         let {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/employee?email=${match.params.email}`)
    //         console.log(data);
    //         setUser(data)
    //     }
    //     fetchData() 
        
    // }, [])
    // console.log(user);
    
    const {firstName, lastName, user_type, email, country, phone, gender } = data
   
    const [empWork, setEmpWork] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/works?email=${match.params.email}`)    
        console.log(data);
        setEmpWork(data)
      }
      fetchData()
    }, [])
    function sortByDate(a, b) {
      if (a.date < b.date) {
          return 1;
      }
      if (a.date > b.date) {
          return -1;
      }
      return 0;
  }
  const sorted = empWork.sort(sortByDate);
  console.log(sorted);
  
    // const newEmpWork = empWork.reverse()
    const time = []
    const date = []
    sorted.map((work) => {
      time.push(work.duration.h + (work.duration.m)/60)
      date.push(work.date)
    })
    const nDate = []
  for(let i=0; i<7; i++) {
    nDate.push(date[i])
  }
  
    console.log(time);

    const wdata = {
        labels: nDate,
        datasets: [
          {
            label: "Work Hour",
            data: time,
            borderColor: ['#001737','#001737','#001737','#001737','#001737','#001737','#001737'],
            backgroundColor: ['#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac']
          }
        ]
    
      }

      const options = {
        title: {
          display: true,
          text: 'Last 7 Days Work Hour'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 12,
                stepSize: 2
              }
            }
          ]
        }
      }

     
  return (
    <ProjectDetailsWrapper>
      <Main>
     
        <Row gutter={25}>
          <Col xxl={24} xl={24} xs={24} style={{textAlign: 'center'}}>
          <Suspense
                          fallback={
                            <Cards headless>
                              <Skeleton avatar active />
                            </Cards>
                          }
                        >
            <Cards headless>
            <h3>Team Details</h3>
            <hr />
              <div className="state-single">
              <div className="color-secondary">
                  
              <FeatherIcon icon="user" size={25} />
           
          </div>
                <div>
                  <h2><strong>{firstName + ' ' + lastName + ' [' + user_type + ']' }</strong></h2>
                </div>
              </div>

              <div className="state-single">
                <div className="color-secondary">
                  
                    <FeatherIcon icon="smile" size={25} />
                 
                </div>
                
                <div>
                  <p>{gender}</p>
                </div>
              </div>
              <div className="state-single">
                <div className="color-secondary">
                  
                    <FeatherIcon icon="map-pin" size={25} />
                 
                </div>
                
                <div>
                  <p>{country}</p>
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
            
            </Suspense>
           
          </Col>
          </Row> 
          <AssignedProject email={match.params.email} />
          <br />
          <AssigedIssue email={match.params.email} />
          
          <Bar data={wdata} options={options} />     
      </Main>
      {/* <Main style={{display: 'flex', justifyContent: 'center',width: '70vw', paddingTop: '4rem'}}>
            
            
           
          </Main> */}
    </ProjectDetailsWrapper>
  );
};

UserDetails.propTypes = {
  match: propTypes.object,
};

export default UserDetails;
