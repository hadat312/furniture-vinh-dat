import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';

//pages
import HomeLayout from './common/HomeLayout';
import DefaultLayout from './common/DefaultLayout';
import ErrorLayout from './common/ErrorLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import DetailPage from './pages/ProductDetail';
import LoginPage from './pages/Login';
import ProductListPage from './pages/ProductList';
import CartPage from './pages/Cart';
import MyAccountPage from './pages/MyAccount';
import CheckoutPage from './pages/Checkout';
import OrderTrackingPage from './pages/OrderTracking';
import ErrorPage from './pages/Error';

function BrowserRouter(props) {
  const { productLists } = props;
  return (
    <Router history={history}>
      <Switch>
        <HomeLayout
          exact
          path={ROUTERS.HOME}
          component={HomePage}
          productLists={productLists}
        />
        <DefaultLayout
          exact
          path={ROUTERS.ABOUT}
          component={AboutPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.CUSTOMER_LOGIN}
          component={LoginPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_LIST}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={DetailPage}
          productLists={productLists}
        />
        <DefaultLayout
          exact
          path={ROUTERS.CART}
          component={CartPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.MY_ACCOUNT}
          component={MyAccountPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.CHECKOUT}
          component={CheckoutPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.ORDER_TRACKING}
          component={OrderTrackingPage}
        />
        <ErrorLayout
          exact
          path={ROUTERS.ERROR}
          component={ErrorPage}
        />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
