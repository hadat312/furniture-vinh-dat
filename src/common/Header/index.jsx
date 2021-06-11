import {
  Row,
  Col,
  Typography,
  Menu,
  Dropdown,
  Button,
  Badge,
  Space,
  Input,
  Drawer,
  Divider,
  List,
  Avatar,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
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
  getProductListAction,
  getSearchResultsAction,
  addSearchResultsAction,
}
  from '../../redux/actions'

import * as Style from './styles';
import './header.css';
function Header({
  getSearchKey,
  setGetSearchKey,

  searchResultList,
  userInfo,
  getUserInfo,
  cartList,
  wishlist,
  getCategories,
  categories,
  // categoryId,
  productList,
  getProductList,
  getSearchResults,
  addSearchResults
}) {


  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  useEffect(() => {
    if (userInfoLocalStorage && userInfoLocalStorage.id) {
      getUserInfo({ id: userInfoLocalStorage.id });
    }
    getCategories()
    // getProductList({})
  }, []);

  // useEffect(() => {
  //   getUserInfo({ id: userInfoLocalStorage.id });
  // }, [userInfo.data]);

  const countCarts = cartList.data.length;
  const countWishlist = wishlist.data.length;

  const { Title } = Typography;

  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  // const [getSearchKey, setGetSearchKey] = useState('');

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  function onSearch(e) {
    const searchKey = e.target.value;

    getSearchResults({
      // page: 1,
      limit: 10,
      // categoryId: categoryId,
      searchKey: searchKey,
    })
  }

  function onEnter(e) {
    // addSearchResults(productList.data)
    if (e.key === 'Enter') {
      console.log('onEnter: ', e.target.value);
      setGetSearchKey(e.target.value);
      history.push(ROUTERS.SEARCH_RESULTS);
    }
  }

  function optionUser() {
    if (userInfoLocalStorage && userInfoLocalStorage.id) {
      if (userInfo.data.userRole === 'customer') {
        return (
          <Menu>
            <Menu.Item key='dropdown-user-info-01'>
              <div className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</div>
            </Menu.Item>
            <Menu.Item key='dropdown-user-info-02'>
              <div className="btn-into" onClick={() => handleLogout()}>Đăng xuất</div>
            </Menu.Item>
          </Menu>
        );
      }
      else if (userInfo.data.userRole === 'admin') {
        return (
          <Menu>
            <Menu.Item key='dropdown-admin-info-01'>
              <div className="btn-into" onClick={() => history.push(ROUTERS.ADMIN)}>Trang admin</div>
            </Menu.Item>
            <Menu.Item key='dropdown-admin-info-02'>
              <div className="btn-into" onClick={() => history.push(ROUTERS.MY_ACCOUNT)}>Hồ sơ cá nhân</div>
            </Menu.Item>
            <Menu.Item key='dropdown-admin-info-03'>
              <div className="btn-into" onClick={() => handleLogout()}>Đăng xuất</div>
            </Menu.Item>
          </Menu>
        );
      }
    } else {
      return (
        <Menu>
          <Menu.Item key='dropdown-user-info-06'>
            <div className="btn-into" onClick={() => history.push(ROUTERS.LOGIN)}>Đăng nhập</div>
          </Menu.Item>
        </Menu>
      );
    }
  }

  function renderCategory() {
    return categories.data.map((categoryItem, categoryIndex) => {
      return (
        <Item
          key={'category-', categoryIndex + 1}
          categoryItem={categoryItem}
        />
      )
    });
  }

  function renderCategoryResponsive() {
    return categories.data.map((categoryItem, categoryIndex) => {
      return (
        <>
          <div
            style={{
              borderBottom: '1px solid #874d00',
              padding: '12px',
            }}
          >
            <Item
              key={'category-responsive-', categoryIndex + 1}
              categoryItem={categoryItem}
              fontWeightBold='bold'
            />
          </div>
        </>
      )
    })
  }

  function renderSearchResults() {
    return (
      searchResultList.data.map((searchResultItem, searchResultIndex) => {
        return (
          <Menu.Item
            key={'dropdown-search-results-' + searchResultIndex + 1}
            onClick={() => history.push(`/home/${searchResultItem.categoryId}/${searchResultItem.id}`)}
          >
            {searchResultItem.productName}
          </Menu.Item>
        )
      })
    )
  }

  return (
    <Style.HeaderContainer headerHeight="80" className="header">
      <nav>
        {/* BRAND */}
        <div className="header__brand">
          <div className="brand__bg">
            <img src={logo1} onClick={() => history.push(ROUTERS.HOME)} />
          </div>
        </div>

        {/* HEADER MENU */}
        {
          isShowSearchBar
            ? (
              <div className="header__search">
                <div className="header__search__search-bar">
                  <Dropdown
                    overlay={
                      <Menu>
                        {renderSearchResults()}
                      </Menu>
                    }
                    placement="bottomCenter" arrow>
                    <Input
                      className="header__search__input-search"
                      placeholder="Nhập tên sản phẩm..."
                      onChange={(e) => onSearch(e)}
                      // onPressEnter={(e) => onEnter(e)}
                      onKeyDown={(e) => onEnter(e)}
                    />
                  </Dropdown>
                </div>
              </div>
            )
            : (
              <div className="header__nav-links-menu">
                <ul>
                  {renderCategory()}
                  <li><a onClick={() => history.push(ROUTERS.ABOUT)}>GIỚI THIỆU</a></li>
                </ul>
              </div>
            )
        }

        {/* SEARCH, WISHLIST, CART AND USER */}
        <div className="header__nav-links-user">
          <ul>
            <li >
              {
                isShowSearchBar
                  ? <AiOutlineClose
                    className="nav-links-user__search-icon"
                    onClick={() => { setIsShowSearchBar(!isShowSearchBar) }}
                  />
                  : <AiOutlineSearch
                    className="nav-links-user__search-icon"
                    onClick={() => setIsShowSearchBar(!isShowSearchBar)}
                  />
              }

            </li>
            <li className="nav-links-user__wishlist">
              <Badge size="small" count={countWishlist} >
                <AiOutlineHeart
                  className="nav-links-user__heart-icon"
                  onClick={() => { history.push(ROUTERS.WISHLIST) }}
                />
              </Badge>
            </li>
            <li className="nav-links-user__carts">
              <Badge size="small" count={countCarts}>
                <AiOutlineShoppingCart
                  className="nav-links-user__cart-icon"
                  onClick={() => { history.push(ROUTERS.CART) }}
                />
              </Badge>
            </li>
            <li>
              {
                userInfo.data.id
                  ?
                  <Dropdown
                    overlay={optionUser}
                    placement="bottomCenter"
                    className="nav-links-user__dropdown"
                    arrow
                  >
                    <div>
                      <Avatar className="avatar__img"
                        style={{ margin: 10 }}
                        size={{ xs: 30, sm: 35, md: 40, lg: 45, xl: 50, xxl: 55 }}
                        // icon={<UserOutlined />}
                        src={userInfo.data.userImage}
                      />
                      <p className="user-info">{userInfo.data.userName}</p>
                    </div>
                  </Dropdown>
                  :
                  <Dropdown
                    overlay={optionUser}
                    placement="bottomCenter"
                    arrow
                  >
                    <div>
                      <AiOutlineUser className="nav-links-user__user-icon" />
                    </div>
                  </Dropdown>

              }
            </li>
            <li>
              <AiOutlineMenu
                className="hamburger-container__hamburger-icon"
                onClick={() => setIsShowDrawer(true)}
              />
            </li>
          </ul>
        </div>
        <div className="header__nav-links-menu-responsive">
          <Drawer
            title={
              <>
                <AiOutlineClose
                  style={{ fontSize: 20 }}
                  onClick={() => setIsShowDrawer(false)}
                />
                <Style.UlDrawer >
                  <li >
                    <Badge size="small" count={countWishlist} >
                      <AiOutlineHeart
                        className="nav-links-user__heart-icon"
                        onClick={() => { history.push(ROUTERS.WISHLIST) }}
                      />
                    </Badge>
                  </li>
                  <li>
                    <Badge size="small" count={countCarts}>
                      <AiOutlineShoppingCart
                        className="nav-links-user__cart-icon"
                        onClick={() => { history.push(ROUTERS.CART) }}
                      />
                    </Badge>
                  </li>
                </Style.UlDrawer>
              </>
            }
            placement="right"
            closable={false}
            onClose={() => setIsShowDrawer(false)}
            visible={isShowDrawer}
          >
            <ul>
              {renderCategoryResponsive()}
              <div
                style={{
                  padding: '12px',
                }}
              >
                <a
                  style={{ fontWeight: 'bold' }}
                  onClick={() => history.push(ROUTERS.ABOUT)}
                >
                  GIỚI THIỆU
                  </a>
              </div>
            </ul>
          </Drawer>
        </div>
      </nav>

    </Style.HeaderContainer>
  );
}


const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  const { wishlist } = state.wishlistReducer;
  const { categories, subCategories, itemCategories } = state.categoriesReducer;
  const { productList } = state.productReducer;
  const { searchResultList } = state.searchResultsReducer;
  return {
    userInfo: userInfo,
    cartList: cartList,
    wishlist: wishlist,
    categories: categories,
    subCategories: subCategories,
    itemCategories: itemCategories,
    productList: productList,
    searchResultList: searchResultList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getCategories: (params) => dispatch(getCategoriesAction(params)),
    getSubCategories: (params) => dispatch(getSubCategoriesAction(params)),
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),
    getProductList: (params => dispatch(getProductListAction(params))),
    addSearchResults: (params) => dispatch(addSearchResultsAction(params)),
    getSearchResults: (params) => dispatch(getSearchResultsAction(params))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);