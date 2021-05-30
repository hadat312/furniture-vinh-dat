import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';

//pages
import HomeLayout from './common/HomeLayout';
import DefaultLayout from './common/DefaultLayout';
import ProfileLayout from './common/ProfileLayout';
import PlaceOrderLayout from './common/PlaceOrderLayout';
import ErrorLayout from './common/ErrorLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About'
import DetailPage from './pages/ProductDetail';
import ProductListPage from './pages/ProductList';
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
import AdminVoucher from  './pages/AdminVoucher'
import SubCategoryAdmin from './pages/SubcategoryManagement'

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

        <HomeLayout
          exact
          path={ROUTERS.ADMIN_USER}
          component={AdminUserPage}
        />

        {/* <HomeLayout
          exact
          path={ROUTERS.ADMIN_PRODUCT}
          component={AdminProductPage}
        /> */}
        <Route
          exact
          path={ROUTERS.ADMIN_PRODUCT}
          component={AdminProduct}
        />

        <HomeLayout
          exact
          path={ROUTERS.ADMIN_SUBCATEGORY}
          component={SubCategoryAdmin}
        />

        <HomeLayout
          exact
          path={ROUTERS.ADMIN_VOUCHER}
          component={AdminVoucher}
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
        {/* <DefaultLayout
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
        /> */}

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

        <ProfileLayout
          exact
          path={ROUTERS.ADDRESS}
          component={AddressPage}
        />

        <ProfileLayout
          exact
          path={ROUTERS.MY_ACCOUNT}
          component={MyAccountPage}
        />

        <ProfileLayout
          exact
          path={ROUTERS.CHANGE_PASSWORD}
          component={ChangePasswordPage}
        />

        <ProfileLayout
          exact
          path={ROUTERS.MY_ORDER}
          component={OrderPage}
        />


        <PlaceOrderLayout
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

        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT}
          component={ProductListPage}
        />

        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={DetailPage}
        />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
