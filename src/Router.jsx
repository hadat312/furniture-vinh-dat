import React, { useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';

//layout
import HomeLayout from './common/HomeLayout';

import DefaultLayout from './common/DefaultLayout';

import ProfileLayout from './common/ProfileLayout';

import PlaceOrderLayout from './common/PlaceOrderLayout';

import ErrorLayout from './common/ErrorLayout';

import AdminLayout from './common/AdminLayout';
//pages
import HomePage from './pages/Home';

import AboutPage from './pages/About'

import SearchProductListPage from './pages/SearchProductList';
import ProductListPage from './pages/ProductList';
import DetailPage from './pages/ProductDetail';

import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';


import MyAccountPage from './pages/MyAccount';
import AddressPage from './pages/Address';
import ChangePasswordPage from './pages/ChangePassword';
import OrderPage from './pages/Order';


import CheckOutPage from './pages/Checkout'

import OrderTrackingPage from './pages/OrderTracking';

import ErrorPage from './pages/Error';

import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';

import AdminPage from './pages/Admin';
import AdminUserPage from './pages/AdminUser';
import AdminProduct from './pages/AdminPro';
import AdminVoucher from './pages/AdminVoucher'
import SubCategoryAdmin from './pages/SubcategoryManagement'

function BrowserRouter(props) {
  const [getSearchKey, setGetSearchKey] = useState('');
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/home"} />} />
        <HomeLayout
          exact
          path={ROUTERS.HOME}
          component={HomePage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />
        <HomeLayout
          exact
          path={ROUTERS.ABOUT}
          component={AboutPage}
          getSearchKey={getSearchKey} 
          setGetSearchKey={setGetSearchKey}
        />

        <AdminLayout
          exact
          path={ROUTERS.ADMIN}
          component={AdminPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <AdminLayout
          exact
          path={ROUTERS.ADMIN_USER}
          component={AdminUserPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        {/* <HomeLayout
          exact
          path={ROUTERS.ADMIN_PRODUCT}
          component={AdminProductPage}
        /> */}
        <AdminLayout
          exact
          path={ROUTERS.ADMIN_PRODUCT}
          component={AdminProduct}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />
        <AdminLayout
          exact
          path={ROUTERS.ADMIN_SUBCATEGORY}
          component={SubCategoryAdmin}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <AdminLayout
          exact
          path={ROUTERS.ADMIN_VOUCHER}
          component={AdminVoucher}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <Route
          exact
          path={ROUTERS.REGISTER}
          component={RegisterPage}
        />

        <Route
          exact
          path={ROUTERS.LOGIN}
          component={LoginPage}
        />

        <DefaultLayout
          exact
          path={ROUTERS.CART}
          component={CartPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />
        <DefaultLayout
          exact
          path={ROUTERS.WISHLIST}
          component={WishlistPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <ProfileLayout
          exact
          path={ROUTERS.ADDRESS}
          component={AddressPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <ProfileLayout
          exact
          path={ROUTERS.MY_ACCOUNT}
          component={MyAccountPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <ProfileLayout
          exact
          path={ROUTERS.CHANGE_PASSWORD}
          component={ChangePasswordPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <ProfileLayout
          exact
          path={ROUTERS.MY_ORDER}
          component={OrderPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />


        <PlaceOrderLayout
          exact
          path={ROUTERS.CHECKOUT}
          component={CheckOutPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />
        {/* <DefaultLayout
          exact
          path={ROUTERS.ORDER_TRACKING}
          component={OrderTrackingPage}
        /> */}
        <ErrorLayout
          exact
          path={ROUTERS.ERROR}
          component={ErrorPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <DefaultLayout
          exact
          path={ROUTERS.SEARCH_RESULTS}
          component={SearchProductListPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}

        />

        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT}
          component={ProductListPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />

        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={DetailPage}
          getSearchKey={getSearchKey}
          setGetSearchKey={setGetSearchKey}
        />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
