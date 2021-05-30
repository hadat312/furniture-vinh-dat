import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Space, Typography, Menu, Button } from 'antd';
import history from '../../utils/history'
import { ROUTERS } from '../../constants/router';
import { connect } from 'react-redux';

import {
  getUserInfoAction,
  getCategoriesAction,
  getSubCategoriesAction,
  getItemCategoriesAction,
  getProductListAction,
  getSearchResultsAction,
}
  from '../../redux/actions'

import Main from './components/Main';

function SearchProductListPage({
  userInfo,
  productList,
  searchResultList,
  getUserInfo,
  getProductList,
  getSearchResults,
  getSubCategories,
  getItemCategories,
  match
}) {
  const list = [];
  const { Title } = Typography;
  const categoryId = match.params.id;
  const [itemInRow, setItemInRow] = useState(6);
  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfoLocalStorage && userInfoLocalStorage.id) {
      getUserInfo({ id: userInfoLocalStorage.id });
    }
    getSearchResults({
      page: 1,
      limit: 20
    })
    // getProductList({
    //   page: 1,
    //   limit: 10,
    //   // searchKey: searchKey,
    // })
  }, []);

  function onSearch(e) {
    const searchKey = e.target.value;
    getProductList({
      page: 1,
      limit: 10,
      searchKey: searchKey,
    })
  }

  function sortDescendingProduct() {
    getProductList({
      page: 1,
      limit: 4,
      sort: "productPrice",
      order: "desc"
    })
  }

  function sortAscendingProduct() {
    getProductList({
      page: 1,
      limit: 4,
      sort: "productPrice",
      order: "asc"
    })
  }

  function handleShowMore() {
    getProductList({
      more: true,
      page: productList.page + 1,
      limit: 4,
      categoryId: categoryId,
      // itemCategoryId: itemCategorySelected,
    });
  }

  return (
    <div className="product-container">
      <div className="product-container__shop-header" >
        <div className="shop-header__content">
          <div span={12} className="content__format">
            <div className="d-flex justify-content-end" style={{ fontSize: "30px" }}>
              {/* BUTTON HIỂN THỊ 4 SẢN PHẨM TRÊN 1 HÀNG*/}
              <Button
                focusable
                className="content__format__button-4-item"
                onClick={() => {
                  setItemInRow(6);
                }}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"></path></svg>
              </Button>
              {/* BUTTON HIỂN THỊ 1 SẢN PHẨM TRÊN 1 HÀNG*/}
              <Button
                className="content__format__button-1-item"
                onClick={() => {
                  setItemInRow(24);
                }}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-container__shop-body">
        <Row>
          <Col span={2}></Col>
          <Col span={4} className="">
            <div className="shop-body__sideBar">
              <Space direction="vertical">
                <Input.Search
                  onChange={(e) => onSearch(e)}
                  placeholder="Tìm kiếm..."
                  className="input-search-content"
                />
                <div className="sideBar__sort-price">
                  <Title level={3}>Sắp xếp theo giá</Title>
                  <Menu key="g1" title="Item 1" mode="inline">
                    <Menu.Item
                      key="1"
                      onClick={sortDescendingProduct}
                    >
                      Giảm dần
                      </Menu.Item>
                    <Menu.Item
                      key="2"
                      onClick={sortAscendingProduct}
                    >
                      Tăng dần
                    </Menu.Item>
                  </Menu>
                </div>
              </Space>
            </div>
          </Col>
          <Col span={16} className="">
            <div className="shop-body__main">
              {/* HIỂN THỊ SẢN PHẨM */}
              <Main
                categoryId={categoryId}
                itemInRow={itemInRow}
                productList={productList}
                handleShowMore={handleShowMore}
              />
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  // const { cartList } = state.cartReducer;
  // const { wishlist } = state.wishlistReducer;
  const { categories, subCategories, itemCategories } = state.categoriesReducer;
  const { productList } = state.productReducer;
  const { searchResultList } = state.searchResultsReducer;
  return {
    subCategories: subCategories,
    itemCategories: itemCategories,
    userInfo: userInfo,
    productList: productList,
    searchResultList: searchResultList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getProductList: (params => dispatch(getProductListAction(params))),
    getSearchResults: (params) => dispatch(getSearchResultsAction(params))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductListPage);