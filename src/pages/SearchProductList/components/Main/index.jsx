import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getItemCategoriesAction,
  getProductListAction
} from '../../../../redux/actions';
import Item from './components/Item';
function Main({
  itemInRow,
  searchResultList,
  handleShowMore,
  categoryId,
}) {
  // console.log("main-categoryId: ", categoryId);
  // get data từ localStorage để kiểm tra

  // console.log(productList.data[0].colors[1].price);

  function renderSearchResult() {
    if (searchResultList.load) return <p>Loading...</p>;
    return searchResultList.data.map((searchResultItem, searchResultIndex) => {
      return (
        <Item
          key={searchResultItem.id}
          categoryId={categoryId}
          searchResultItem={searchResultItem}
          itemInRow={itemInRow}
        />
      );
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
        {searchResultList.data.length % 4 === 0 && (
          <Button onClick={handleShowMore}>Show more</Button>
        )}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  const { itemCategories } = state.categoriesReducer;
  return {
    itemCategories: itemCategories,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);