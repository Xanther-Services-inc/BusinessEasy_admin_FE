import React, { lazy, useState, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import {teamGetData} from '../../redux/team/actionCreator'

const Team = () => {
  const dispatch = useDispatch()
  const team = useSelector((state) => state.team)


  const { data, err} = team

  console.log(data);

  useEffect(() => {
    dispatch(teamGetData())
  }, [dispatch])


  return (
    <>
      <CardToolbox>
        <PageHeader
          backIcon={false}
          title="Team Members"
         
        />
      </CardToolbox>
      

      <Main>
        <Row gutter={25}>
          {data.map(user => {
            
            const TeamCard = lazy(() => import('./overview/TeamCard'));
            const { id } = user;
            return (
              user.user_type === 'employee' ? <Col key={id} xxl={6} lg={8} sm={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar active />
                  </Cards>
                }
              >
                <TeamCard key={id} user={user} />
              </Suspense>
            </Col> : user.user_type === 'b_manager' ? <Col key={id} xxl={6} lg={8} sm={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar active />
                </Cards>
              }
            >
              <TeamCard key={id} user={user} />
            </Suspense>
          </Col> : null
              
            );
          })}
        </Row>
      </Main>
    </>
  );
};

export default Team;
