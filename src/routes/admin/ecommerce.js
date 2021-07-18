import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Product = lazy(() => import('../../container/ecommerce/product/Products'));
const ProductAdd = lazy(() => import('../../container/ecommerce/product/AddProduct'));
const ProductEdit = lazy(() => import('../../container/ecommerce/product/EditProduct'));
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails'));
const Orders = lazy(() => import('../../container/ecommerce/orders/allOrders'));
const OrderDetails = lazy(() => import('../../container/ecommerce/orders/OrderDetails'));
const OrderGraph = lazy(() => import('../../container/ecommerce/orders/orderGraph'));
const ExportToCSV = lazy(() => import('../../container/ecommerce/orders/ExportToCSV'));

const EcommerceRoute = () => {
  const { path } = useRouteMatch();
  const userLogin = useSelector(state => state.auth);
  const { login } = userLogin;
  console.log(JSON.parse(login).type);

  return (
    <Switch>
      <Route path={`${path}/products`} component={Product} />
      <Route exact path={`${path}/add-product`} component={ProductAdd} />
      <Route exact path={`${path}/edit-product`} component={ProductEdit} />
      <Route exact path={`${path}/productDetails/:id`} component={ProductDetails} />
      <Route exact path={`${path}/orders`} component={Orders} />
      <Route exact path={`${path}/orders-to-csv`} component={ExportToCSV} />
      <Route path={`${path}/orders/:id`} component={OrderDetails} />
      <Route path={`${path}/ordersgraph`} component={OrderGraph} />
    </Switch>
  );
};

export default EcommerceRoute;
