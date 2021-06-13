import React, { lazy, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Spin, Skeleton } from 'antd';
import { Switch, NavLink, Route, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from '../Style';
import { sorting } from '../../../redux/product/actionCreator';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { Cards } from '../../../components/cards/frame/cards-frame';

const Filters = lazy(() => import('./overview/Filters'));
const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

const Product = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    active: 'active',
  });

  const { notData } = state;

  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = e => {
    dispatch(sorting(e.target.value));
  };

  return (
    <>
      {/* <PageHeader
        ghost
        title="Shop"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      /> */}
      <Main>
        <Row gutter={30}>
          {/* <Col className="product-sidebar-col" xxl={5} xl={7} lg={7} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton paragraph={{ rows: 22 }} active />
                </Cards>
              }
            >
              <Filters />
            </Suspense>
          </Col> */}
          <u style={{fontSize: '2rem', margin: "5px", marginLeft: "40%"}}>Products</u>
          <hr />
          <br />
          <Col className="product-content-col" xxl={24} lg={24} md={24} xs={24}>
            <Switch>
              <Suspense
                fallback={
                  <div className="spin d-flex align-center-v">
                    <Spin />
                  </div>
                }
              >
                <Route exact path={path} component={Grid} />
                
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Product;
