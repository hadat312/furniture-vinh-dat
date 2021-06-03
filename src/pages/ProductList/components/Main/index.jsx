import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getItemCategoriesAction,
  getProductListAction,
  getAllCommentAction
  
} from '../../../../redux/actions';
import Item from './components/Item';
import './main.css';
function Main(props) {
  const {

    itemInRow,
    productList,
    handleShowMore,
    categoryId,
    getAllComment,
    commentList
  } = props;
  // console.log("main-categoryId: ", categoryId);
  // get data từ localStorage để kiểm tra

  // console.log(productList.data[0].colors[1].price);
  useEffect(() => {
    getAllComment();
  }, [])

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productListItem, productListIndex) => {
      let totalRate = 0;
      let count = 0;
      commentList.data.map((commentListItem) => {
        if (productListItem.id === commentListItem.productId) {
          totalRate = totalRate + commentListItem.rate
          count = count + 1
        }
      })
      return (
        <Item
          key={productListItem.id}
          categoryId={categoryId}
          productListItem={productListItem}
          itemInRow={itemInRow}
          averageRate={count !== 0 ? Math.ceil(totalRate / count) : 0}
          count={count}
        />
      );
    })
  }

  return (
    <div className="main-container">
      <Row gutter={[24, 24]}>
        {/* 1-24 4-6 */}
        {renderProductList()}
      </Row>
      <div className="d-flex justify-content-center mt-5">
        {/* nếu tổng số sản phẩm(length) là chẵn =>  hiện button [Show more]*/}
        {productList.data.length % 4 === 0 && (
          <Button onClick={handleShowMore}>Show more</Button>
        )}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  const { itemCategories } = state.categoriesReducer;
  const { commentList } = state.commentReducer;
  return {
    itemCategories: itemCategories,
    commentList: commentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),

    getAllComment: (params) => dispatch(getAllCommentAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);