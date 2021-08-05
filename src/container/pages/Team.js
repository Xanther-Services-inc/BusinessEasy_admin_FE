import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { teamGetData } from '../../redux/team/actionCreator';
import axios from 'axios';

const Team = () => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.team);

  const { data, err } = team;

  useEffect(() => {
    dispatch(teamGetData());
  }, [dispatch]);

  // Export to csv file
  const handleCSV = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/getAllEmp/export-emp-list-csv`);
    window.location.href = data.message;
  };

  return (
    <>
      <Button style={{ display: 'flex', left: '70vw', margin: '10px 0' }} type="primary" onClick={handleCSV}>
        Export
      </Button>
      <CardToolbox>
        <PageHeader backIcon={false} title="Team Members" />
      </CardToolbox>

      <Main>
        <Row gutter={25}>
          {data.map(user => {
            const TeamCard = lazy(() => import('./overview/TeamCard'));
            const { id } = user;
            return user.user_type === 'employee' ? (
              <Col key={id} xxl={6} lg={8} sm={12} xs={24}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton avatar active />
                    </Cards>
                  }
                >
                  <TeamCard key={id} user={user} />
                </Suspense>
              </Col>
            ) : user.user_type === 'b_manager' ? (
              <Col key={id} xxl={6} lg={8} sm={12} xs={24}>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton avatar active />
                    </Cards>
                  }
                >
                  <TeamCard key={id} user={user} />
                </Suspense>
              </Col>
            ) : null;
          })}
        </Row>
      </Main>
    </>
  );
};

export default Team;
