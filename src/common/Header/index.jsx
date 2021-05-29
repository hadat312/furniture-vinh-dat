import { Row, Col, Typography, Menu, Dropdown, Button, Badge, Space, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';

import logo1 from '../../images/logo1.jpg'
import search from '../../images/search.svg'
import cart from '../../images/cart.svg'
import heart from '../../images/heart.svg'
import user from '../../images/user.svg'

import Item from './components/Item';

import {
  getUserInfoAction,
  getCategoriesAction,
  getSubCategoriesAction,
  getItemCategoriesAction,
  getProductListAction
}
  from '../../redux/actions'

import './index.css';
function Header({
  userInfo,
  getUserInfo,
  cartList,
  wishlist,
  getCategories,
  getSubCategories,
  getItemCategories,
  categories,
  subCategories,
  itemCategories,
  categoryId,
  getProductList
}) {


  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
    if (userInfo && userInfoLocalStorage.id) {
      getUserInfo({ id: userInfoLocalStorage.id });
    }
    getCategories({
      page: 1,
      limit: 20
    })
    getSubCategories({
      page: 1,
      limit: 20,
      categoryId: categoryId
    });
    getItemCategories({
      page: 1,
      liit: 20,
      categoryId: categoryId
    });

    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId
    });
  }, []);
  const countCarts = cartList.data.length;
  const countWishlist = wishlist.data.length;

  const { Title } = Typography;

  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  function renderCategory() {
    return categories.data.map((categoryItem, categoryIndex) => {
      return (
        <>
          <Item
            key={categoryItem.id}
            categoryItem={categoryItem}
            id={categoryItem.id}
          />
        </>
      )

    })
  }

  // Render dropdown Admin

  // function renderShow() {
  //   return userInfo.data.map((userItem, userIndex) => {
  //     console.log("🚀 ~ file: index.jsx ~ line 98 ~ returnuserInfo.data.map ~ userInfo", userInfo)
  //     if (userItem.userRole === "admin") {
  //       return (
  //         <>
  //           <p className="user-info">{`Xin chào: ${userInfo.data.userName}`}</p>
  //           <li className="btn-into" onClick={() => history.push(ROUTERS.ADMIN)}>Quản LÝ</li>
  //           <li className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</li>
  //           <li className="btn-into" onClick={() => handleLogout()}>Đăng Xuất </li>
  //         </>
  //       )
  //     }else if(userItem.userRole === "customer"){
  //       return (
  //         <>
  //         <p className="user-info">{`Xin chào: ${userInfo.data.userName}`}</p>
  //         <li className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</li>
  //         <li className="btn-into" onClick={() => handleLogout()}>Đăng Xuất </li>
  //       </>
  //       )
  //     }return  <li className="btn-into" onClick={() => history.push(ROUTERS.LOGIN)}>Đăng Nhập </li>
  //   })
  // }
  

  return (
    <>
      <div className="header-bg ">
        <div className="header-purpot">
          <div className="header-purpot_logo">
            {/* <div className="header-logo_hambuger">
              <img src={hamburger} alt="" style={{ display: 'none' }} />
            </div> */}

            <div className="header-logo_brand">
              <img src={logo1} alt="" />
            </div>
          </div>

          <ul className="header-menu">
            {
              isShowSearchBar
                ? <Input
                  style={{
                    width: 1200,
                    borderRadius: 50,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                  placeholder="Nhập tên sản phẩm"
                />
                : <>
                  {renderCategory()}
                  <li><a className="menu-item" onClick={() => history.push(ROUTERS.ABOUT)}>Giới thiệu</a></li>
                </>
            }
            <div className="animation start-home"></div>
          </ul>

          <div
            // className="header__block"
            className="header-purpot_icon"
          >

            {/* <img src={search} alt="" onClick={() => setIsShowSearchBar(!isShowSearchBar)} /> */}
            <div
              style={{ marginRight: 10 }}
            >
              <AiOutlineSearch
                className="block__search-item"
                onClick={() => setIsShowSearchBar(!isShowSearchBar)}
              />
            </div>
            <div className="block__user" style={{ marginRight: 10 }}>
              {/* <img src={user} alt="" /> */}
              <AiOutlineUser className="block__user-item" />
              <div className="user-container">
                <p className="user-area">
                  {userInfo.data.id
                    ?
                    <>
                      <p className="user-info">{`Xin chào: ${userInfo.data.userName}`}</p>
                      <li className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</li>
                      <li className="btn-into" onClick={() => handleLogout()}>Đăng Xuất </li>
                    </>
                    : <div className="btn-into" onClick={() => history.push(ROUTERS.LOGIN)}>Đăng nhập</div>
                  }
                  {/* {renderShow()} */}
                </p>
              </div>
            </div>
            <div
              style={{ marginRight: 10 }}
            >
              <Badge size="small" count={countWishlist} >
                <AiOutlineHeart
                  className="block__heart-item"
                  onClick={() => { history.push(ROUTERS.WISHLIST) }}
                />
              </Badge>
            </div>
            {/* <img src={heart} alt="" onClick={() => { history.push(ROUTERS.WISHLIST) }} /> */}
            <div
              style={{ marginRight: 10 }}
            >
              <Badge size="small" count={countCarts}>
                <AiOutlineShoppingCart
                  className="block__cart-item"
                  onClick={() => { history.push(ROUTERS.CART) }}
                />
              </Badge>
            </div>
            {/* <img src={cart} alt="" onClick={() => history.push(ROUTERS.CART)} /> */}
            {/* <ul className="dropdown-btn">
                {userInfo.data.id
                  ? <li className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</li>
                  : <li className="btn-into" onClick={() => history.push(ROUTERS.LOGIN)}>Đăng nhập</li>
                }
                <li className="btn-logout" onClick={() => handleLogout()}>Đăng Xuất</li>
              </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  const { wishlist } = state.wishlistReducer;
  const { categories, subCategories, itemCategories } = state.categoriesReducer;
  const { productList } = state.productReducer;
  return {
    userInfo: userInfo,
    cartList: cartList,
    wishlist: wishlist,
    categories: categories,
    subCategories: subCategories,
    itemCategories: itemCategories,
    productList: productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getCategories: (params) => dispatch(getCategoriesAction(params)),
    getSubCategories: (params) => dispatch(getSubCategoriesAction(params)),
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),

    getProductList: (params => dispatch(getProductListAction(params))),
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);