import { Button, Col, Row, Typography } from 'antd';
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
    // handleShowMore,
    categoryId,
    getAllComment,
    commentList
  } = props;

  const [showMore, setShowMore] = useState(7);

  useEffect(() => {
    getAllComment();
  }, [])

  //khi length productList thay đổi thì setShowMore trở về giá trị mặc định
  useEffect(() => {
    setShowMore(7)
  }, [productList.data.length])

  useEffect(() => {
    getAllComment();
  }, [])

  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  function handleShowMore() {
    if (showMore < productList.data.length) {
      setShowMore(showMore + 8)
    }
  }


  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    if(productList.data.length === 0) return<Typography.Title level={4}>Chưa có sản phẩm</Typography.Title>
    return productList.data.map((productListItem, productListIndex) => {
      let totalRate = 0;
      let count = 0;
      commentList.data.map((commentListItem) => {
        if (productListItem.id === commentListItem.productId) {
          totalRate = totalRate + commentListItem.rate
          count = count + 1
        }
      })
      if (productListIndex <= showMore) {

        return (
          <Item
            key={productListItem.id}
            categoryId={categoryId}
            productListItem={productListItem}
            /*
              itemInRow = 6 => show 4 item
              itemInRow = 24 => show 1 item
            */
            itemInRow={itemInRow}
            averageRate={count !== 0 ? (totalRate / count) : 0}
            count={count}
          />
        );
      }
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
        {/* {productList.data.length % 4 === 0 && (
          // <Button onClick={handleShowMore}>Show more</Button>
          )} */}
        <Button disabled={isDisabledBtn} onClick={handleShowMore}>Xem thêm</Button>

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