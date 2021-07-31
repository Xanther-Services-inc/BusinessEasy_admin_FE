import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { ProjectDetailsWrapper, ProjectCard } from '../../ecommerce/orders/style';
import { Main } from '../../ecommerce/orders/styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const UserDetails = ({ match }) => {
  const userLogin = useSelector(state => state.auth);
  const { login } = userLogin;

  const [user, setUser] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/user?email=${match.params.email}`);

      setUser(data);
    };
    fetchData();
  }, []);

  const { firstName, lastName, user_type, email, country, phone, gender } = user;

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/user-details-orders?email=${match.params.email}`,
      );
      console.log('asdasd', data);
      setUserOrders(data);
    };
    fetchOrders();
  }, [match.params.email]);
  console.log(userOrders);

  let dateFormatter = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  };

  return (
    <ProjectDetailsWrapper>
      <Main>
        <Row gutter={25}>
          <Col xxl={24} xl={24} xs={24} style={{ textAlign: 'center' }}>
            <Cards headless>
              <h3>Customer Details</h3>
              <hr />
              <div className="state-single">
                <div className="color-secondary">
                  <FeatherIcon icon="user" size={25} />
                </div>
                <div>
                  <h2>
                    <strong>{firstName + ' ' + lastName + ' [' + user_type + ']'}</strong>
                  </h2>
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
          </Col>
        </Row>

        {/* <Col xxl={24} xl={24} xs={24}> */}

        <h3 style={{ textAlign: 'center' }}>All Orders</h3>
        <hr />
        <Row>
          {userOrders.map(order => (
            <Col md={6} sm={12} xs={24} lg={6} xl={6}>
              <Card style={{ width: '18rem', margin: '2rem' }}>
                <Card.Body>
                  {/* <Card.Title>🙇 <strong>{order.firstName + ' ' + order.lastName + ' [' + order.gender + ']'}</strong></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">⏲ {dateFormatter(order.dob)}</Card.Subtitle> */}
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Product:</strong> {order.product_id}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>User Email:</strong> {order.email}
                  </Card.Subtitle>
                  {/* <Card.Subtitle className="mb-2 text-muted">📱 {order.phone}</Card.Subtitle> */}
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Assigned Emp:</strong> {order.emp_assigned}
                  </Card.Subtitle>
                  {/* <Card.Subtitle className="mb-2 text-muted">🏳️‍🌈 {order.country + ', ' + order.state + ', ' + order.city}</Card.Subtitle> */}

                  <Card.Text>
                    <strong>Payment Status:</strong> {order.price + ' [' + order.payment + ']'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Payment Id:</strong> {order.payment_id}
                  </Card.Text>
                  {order.image.map(doc => (
                    <>
                      <Card.Link href={doc}>Dowload Document</Card.Link>
                      <br />
                    </>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Main>
    </ProjectDetailsWrapper>
  );
};

UserDetails.propTypes = {
  match: propTypes.object,
};

export default UserDetails;
