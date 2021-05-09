import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getItemCategoriesAction,
  // getProductListAction 
} from '../../../../redux/actions';
import Item from './components/Item';
import './main.css';
function Main(props) {
  const {
    itemInRow,
    products,
  } = props;

  const [limit, setLimit] = useState(4);

  const list = [];
  function renderProductList() {

    if (products.load) return <p>Loading...</p>;

    products.forEach((productListItem, productListIndex) => {
      if (productListIndex <= limit - 1) {
        list.push(
          <Item
            key={productListItem.id}
            id={productListItem.id}
            image={productListItem.productImage}
            name={productListItem.productName}
            description={productListItem.productDescription}
            price={productListItem.productPrice}
            discount={productListItem.productDiscount}
            itemInRow={itemInRow}
          />
        )
      }
    })
    return list;
  }

  return (
    <div className="main-container">
      <Row gutter={[8, 32]}>
        {/* Dùng hàm render ra từng Card */}
        {/* 1-24 4-6 */}
        {renderProductList()}
      </Row>
      <div className="d-flex justify-content-center mt-5">
        <Button onClick={() => {
          setLimit(limit + 4)
        }}>Load More</Button>
      </div>

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