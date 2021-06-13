import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Pagination, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { orderFilter, orderStatusUpdate } from '../../../redux/orders/actionCreator';
import OrderGraph from './orderGraph';



const GridCard = lazy(() => import('./GridCard.js'));


const Orders = () => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orders)

  const {loading, data, err} = orderList

console.log(data);


useEffect(() => {
  dispatch(orderFilter());
  dispatch(orderStatusUpdate())
  console.log(process.env.REACT_APP_API);
}, [dispatch]);

    const history = useHistory()

    // const handleDetails = (id) => {
    //   history.push(id)
    // }

  return (
    
    <div>
    <Jumbotron>
      <Container>
      <Row className="justify-content-md-center">
      <Col md="auto"><h1>All Orders</h1></Col>
      </Row>
      <Row gutter={25}>
      
      {data.length !== 0 ? data.map(order=>(
        <Col key={order.id} xl={8} md={12} xs={24}>
              <Suspense
                fallback={
                  <Cards style={{border:"2px solid red"}}>
                    <Skeleton active />
                  </Cards>
                }
              >
                <GridCard values={order} />
              </Suspense>
            </Col>
         
      
      
      
      )):null}    
            
    </Row>
    </Container>
    </Jumbotron>
  {/* <OrderGraph /> */}
    
    </div>
  );
};

export default Orders;
