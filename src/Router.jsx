import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';

//pages
import HomeLayout from './common/HomeLayout';
import DefaultLayout from './common/DefaultLayout';
import PrivateLayout from './common/PrivateLayout';
import ErrorLayout from './common/ErrorLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About'
import DetailPage from './pages/ProductDetail';
import ProductListPage from './pages/ProductList';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import MyAccountPage from './pages/MyAccount';
import CheckOutPage from './pages/Checkout'
import OrderTrackingPage from './pages/OrderTracking';
import ErrorPage from './pages/Error';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'

function BrowserRouter(props) {
  return (
    <Router history={history}>
      <Switch>
        <HomeLayout
          exact
          path={ROUTERS.HOME}
          component={HomePage}
        />
        <HomeLayout
          exact
          path={ROUTERS.ABOUT}
          component={AboutPage}
        />

        <HomeLayout
          exact
          path={ROUTERS.ADMIN}
          component={AdminPage}
        />

        <Route
          exact
          path={ROUTERS.Register}
          component={RegisterPage}
        />

        <Route
          exact
          path={ROUTERS.Login}
          component={LoginPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.LIVING_ROOM}
          categoryId={"category01"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.DINING_ROOM}
          categoryId={"category02"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.BED_ROOM}
          categoryId={"category03"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.WORK_ROOM}
          categoryId={"category04"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.KITCHEN_CABINETS}
          categoryId={"category05"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.DECORATING_GOODS}
          categoryId={"category06"}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={DetailPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.CART}
          component={CartPage}
        />
        <DefaultLayout
          exact
          path={ROUTERS.WISHLIST}
          component={WishlistPage}
        />
        <PrivateLayout
          exact
          path={ROUTERS.MY_ACCOUNT}
          component={MyAccountPage}
        />
        <PrivateLayout
          exact
          path={ROUTERS.CHECKOUT}
          component={CheckOutPage}
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
