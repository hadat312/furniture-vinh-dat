import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getItemCategoriesAction,
  getProductListAction,
  getAllCommentAction
} from '../../../../redux/actions';
import Item from './components/Item';
function Main({
  itemInRow,
  searchResultList,
  commentList,
  getAllComment,
  categoryId,
}) {

  useEffect(() => {
    getAllComment();
  }, [])

  const [showMore, setShowMore] = useState(7);

  function handleShowMore() {
    if (showMore < searchResultList.data.length) {
      setShowMore(showMore + 8)
    }
  }

  function renderSearchResult() {
    if (searchResultList.load) return <p>Loading...</p>;
    if(searchResultList.data.length === 0) return<Typography.Title level={4}>Chưa có sản phẩm</Typography.Title>
    return searchResultList.data.map((searchResultItem, searchResultIndex) => {

      let totalRate = 0;
      let count = 0;
      commentList.data.map((commentListItem) => {
        if (searchResultItem.id === commentListItem.productId) {
          totalRate = totalRate + commentListItem.rate
          count = count + 1
        }
      })

      if (searchResultIndex <= showMore) {
        return (
          <Item
            key={searchResultItem.id}
            categoryId={categoryId}
            searchResultItem={searchResultItem}
            itemInRow={itemInRow}
            averageRate={count !== 0 ? Math.ceil(totalRate / count) : 0}
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
        {renderSearchResult()}
      </Row>
      <div className="d-flex justify-content-center mt-5">
        {/* nếu tổng số sản phẩm(length) là chẵn =>  hiện button [Show more]*/}
        {/* {searchResultList.data.length % 4 === 0 && (
          <Button onClick={handleShowMore}>Show more</Button>
        )} */}
        <Button onClick={handleShowMore}>Xem thêm</Button>
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