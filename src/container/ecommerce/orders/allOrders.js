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
  // const dispatch = useDispatch();
  // const orderList = useSelector(state => state.orders);

  // const { loading, data, err } = orderList;

  // console.log(data);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders`);
      setOrders(data);
      setFilteredOrders(data);
    };
    fetchData();
  
  }, []);
  console.log("==BEFORESORT========>",orders)
  // const history = useHistory();
  const arr=[{startDate:'11-09-2020'},{startDate:'11-12-2021'},{startDate:'11-02-2021'}]
  const sortByDate = arr => {
    const sorter = (a, b) => {
      console.log("a",a,"b",b)
       return new Date().getTime() - new Date(b.startDate).getTime();
    }
    arr.sort(sorter);
 };
//  sortByDate(orders);
//  sortByDate(arr);
//  console.log(arr)
let sortedCars1 = orders.sort((a, b) => new Date(...b.startDate.split('/').reverse()) - new Date(...a.startDate.split('/').reverse()));
  console.log("Sorted===",sortedCars1);

  const filterItem = payment => {
    const filteredData = filteredOrders.filter(order => {
      return order.payment === payment;
    });
    setOrders(filteredData);
  };

  // const a = filterItem('Due');
  // console.log(a);

  return (
    <div>
      <Jumbotron>
        <Container>
          <Row style={{ margin: '5px 0 0 5px' }} className="justify-content-md-center">
            <Col md={6}>
              <h1>All Orders</h1>
            </Col>
            <Col md={6}>
              <Button type="primary" ghost onClick={() => setOrders(filteredOrders)}>
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
