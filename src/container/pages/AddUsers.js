import React, { lazy, Suspense } from 'react';
import { Row, Col, Spin } from 'antd';
import { Switch, Route, NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { AddUser } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import BInfo from './overview/bInfo';

const Info = lazy(() => import('./overview/info'));
const Work = lazy(() => import('./overview/work'));
const Social = lazy(() => import('./overview/Social'));

const AddNew = ({ match }) => {
  return (
    <>
      {/* <PageHeader ghost title="Add User" /> */}
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards
                title={
                  <div className="card-nav">
                    <ul>
                      <li>
                        <NavLink to='#'>
                          <FeatherIcon icon="user" size={14} />
                          Personal Info
                        </NavLink>
                      </li>
                      
                    </ul>
                  </div>
                }
              >
                <Switch>
                  <Suspense
                    fallback={
                      <div className="spin">
                        <Spin />
                      </div>
                    }
                  >
                    <Route exact path={`${match.path}/info`} component={Info} />
                    <Route exact path={`${match.path}/binfo`} component={BInfo} />
                    <Route path={`${match.path}/work`} component={Work} />
                    <Route path={`${match.path}/social`} component={Social} />
                  </Suspense>
                </Switch>
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

AddNew.propTypes = {
  match: propTypes.object,
};

export default AddNew;
