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
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders`);
      setOrders(data);
    };
    fetchData();
  }, []);

  const history = useHistory();

  console.log(orders);

  const filterItem = payment => {
    const filteredData = orders.filter(order => {
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
              <Button type="primary" ghost onClick={() => window.location.reload()}>
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
            {orders &&
              orders.map(order => (
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
              ))}
          </Row>
        </Container>
      </Jumbotron>
      {/* <OrderGraph /> */}
    </div>
  );
};

export default Orders;
