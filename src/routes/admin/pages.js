import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));

const Faq = lazy(() => import('../../container/pages/Faq'));
const Search = lazy(() => import('../../container/pages/SearchResult'));
const ComingSoon = lazy(() => import('../../container/pages/ComingSoon'));
const BlankPage = lazy(() => import('../../container/pages/BlankPage'));


const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/faq`} component={Faq} />
      <Route path={`${path}/search`} component={Search} />
      <Route path={`${path}/starter`} component={BlankPage} />
      <Route path={`${path}/comingSoon`} component={ComingSoon} />
      
    </Switch>
  );
};

export default PagesRoute;
