import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Pagination, Skeleton } from 'antd';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { UsercardWrapper, UserCarrdTop } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { userGetData } from '../../redux/users/actionCreator';
import axios from 'axios';
const User = lazy(() => import('./overview/UserCard'));

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const { loading, data, err } = users;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(userGetData());
  }, [dispatch]);

  const { path } = useRouteMatch();

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  // Export to csv file
  const handleCSV = async id => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/export-user-list-csv`);
    window.location.href = data.message;
  };

  return (
    <>
      <CardToolbox>
        <UserCarrdTop>
          <PageHeader ghost title="All Users" />
        </UserCarrdTop>
      </CardToolbox>
      <Main>
        <Button style={{ display: 'flex', left: '70vw', margin: '10px 0' }} type="primary" onClick={handleCSV}>
          Export
        </Button>
        <UsercardWrapper>
          <Row gutter={25}>
            <Switch>
              <Route
                path={`${path}/grid`}
                component={() => {
                  return data.map(user => {
                    const { id } = user;

                    return (
                      <Col key={id} xxl={6} xl={8} sm={12} xs={24}>
                        <Suspense
                          fallback={
                            <Cards headless>
                              <Skeleton avatar active />
                            </Cards>
                          }
                        >
                          <User user={user} />
                        </Suspense>
                      </Col>
                    );
                  });
                }}
              />
            </Switch>
          </Row>
        </UsercardWrapper>
      </Main>
    </>
  );
};

export default Users;
