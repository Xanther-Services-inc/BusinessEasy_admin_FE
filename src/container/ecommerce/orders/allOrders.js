import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Button, Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { orderFilter, orderStatusUpdate } from '../../../redux/orders/actionCreator';
import OrderGraph from './orderGraph';
// import Filter from './Filter';

const GridCard = lazy(() => import('./GridCard.js'));

const Orders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.orders);

  const { loading, data, err } = orderList;

  console.log(data);

  useEffect(() => {
    dispatch(orderFilter());
    dispatch(orderStatusUpdate());
    console.log(process.env.REACT_APP_API);
  }, [dispatch]);

  const history = useHistory();

  const [orders, setOrders] = useState(data);
  console.log(orders);

  const filterItem = payment => {
    const filteredData = data.filter(order => {
      return order.payment === payment;
    });
    setOrders(filteredData);
  };

  return (
    <div>
      <Jumbotron>
        <Container>
          <Row style={{ margin: '5px 0 0 5px' }} className="justify-content-md-center">
            <Col md={6}>
              <h1>All Orders</h1>
            </Col>
            <Col md={6}>
              <Button type="primary" ghost onClick={() => setOrders(data)}>
                All
              </Button>
            </Col>
            <Col md={6}>
              <Button type="primary" ghost onClick={() => filterItem('Paid')}>
                Paid
              </Button>
            </Col>
            <Col md={6}>
              <Button type="primary" ghost onClick={() => filterItem('Due')}>
                Due
              </Button>
            </Col>
          </Row>
          <br />
          <Row gutter={25}>
            {orders.length !== 0
              ? orders.map(order => (
                  <Col key={order.id} xl={8} md={12} xs={24}>
                    <Suspense
                      fallback={
                        <Cards style={{ border: '2px solid red' }}>
                          <Skeleton active />
                        </Cards>
                      }
                    >
                      <GridCard values={order} />
                    </Suspense>
                  </Col>
                ))
              : null}
          </Row>
        </Container>
      </Jumbotron>
      {/* <OrderGraph /> */}
    </div>
  );
};

export default Orders;
