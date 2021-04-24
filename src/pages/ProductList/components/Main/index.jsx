import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getItemCategoriesAction,
  getProductListAction 
} from '../../../../redux/actions';
import Item from './components/Item';
import './main.css';
function Main(props) {
  const {
    getProductList,
    isItemCategories,
    // productList,
    itemInRow,
    productListAfterSort
  } = props;

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 20,
    });
  }, []);

  const filterProductList = productListAfterSort.data.filter((productListItem) => {
    return productListItem.itemCategoryId.trim().toLowerCase().indexOf(isItemCategories.trim().toLowerCase()) !== -1;
  });

  function renderProductList() {
    if (productListAfterSort.load) return <p>Loading...</p>;
    return filterProductList.map((productListItem, productListIndex) => {
      return (
        <Item
          key={productListItem.productId}
          id={productListItem.productId}
          image={productListItem.productImage}
          name={productListItem.productName}
          description={productListItem.productDescription}
          price={productListItem.productPrice}
          discount={productListItem.productDiscount}
          itemInRow={itemInRow}
        />
      )
      // }
    })
  }

  return (
    <div className="main-container">
      <Row gutter={[8, 32]}>
        {/* Dùng hàm render ra từng Card */}
        {/* 1-24 4-6 */}
        {renderProductList()}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  // const { productList } = state.productReducer;
  const { itemCategories } = state.categoriesReducer;
  return {
    itemCategories: itemCategories,
    // productList: productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),
    // getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);