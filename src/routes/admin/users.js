import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Users = lazy(() => import('../../container/pages/Users'));
const AddUser = lazy(() => import('../../container/pages/AddUsers'));
const DataTable = lazy(() => import('../../container/pages/UserListDataTable'));
const Team = lazy(() => import('../../container/pages/Team'));
const UserDetails = lazy(() => import('../../container/pages/overview/userDetails'));
// const TeamDetails = lazy(() => import('../../container/pages/overview/TeamDetails'));
import TeamDetails from '../../container/pages/overview/TeamDetails'

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add-user`} component={AddUser} />
      <Route path={`${path}/dataTable`} component={DataTable} />
      <Route path="/admin/users/grid-style/:email" component={UserDetails} />
      <Route path="/admin/users/grid/:email" component={UserDetails} />
      <Route path="/admin/users/list/:email" component={UserDetails} />
      <Route path="/admin/users/team/:email" component={TeamDetails} />
      <Route path={`${path}/team`} component={Team} />
      <Route path={`${path}`} component={Users} />
    </Switch>
  );
};

export default PagesRoute;
