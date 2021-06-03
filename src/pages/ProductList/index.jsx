import { Col, Input, Row, Space, Typography, Menu, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getSubCategoriesAction,
  getItemCategoriesAction,
} from '../../redux/actions';
import Main from './components/Main';
import './productList.css';

function ProductListPage(props) {
  const list = [];
  const { Title } = Typography;
  const {
    getSubCategories,
    getItemCategories,
    getProductList,
    subCategories,
    itemCategories,
    productList,
    match,
  } = props;

  const categoryId = match.params.id;

  const [itemInRow, setItemInRow] = useState(6);
  const [itemCategorySelected, setItemCategorySelected] = useState(undefined);

  useEffect(() => {
    getSubCategories({
      categoryId: categoryId //get SubCategories theo categoryId
    });
    getItemCategories();
    getProductList({
      page: 1,
      limit: 4,    // Thay doi Limit
      categoryId: categoryId
    });
  }, [categoryId]);

  useEffect(() => {
    getSubCategories({
      categoryId: categoryId //get SubCategories theo categoryId
    });
    getItemCategories();
    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId
    });
  }, [categoryId]);

  function onSearch(e) {
    const searchKey = e.target.value;
    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId,
      searchKey: searchKey,
    })
  }

  function sortDescendingProduct() {
    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId,
      sort: "productPrice",
      order: "desc"
    })
  }

  function sortAscendingProduct() {
    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId,
      sort: "productPrice",
      order: "asc"
    })
  }

  //get sản phẩm theo categoryId
  function onFilterCategory() {
    getProductList({
      page: 1,
      limit: 4,
      categoryId: categoryId
    });
  }


  //get sản phẩm theo itemCategoryId
  function onFilterItemCategory(id) {
    setItemCategorySelected(id)
    getProductList({
      page: 1,
      limit: 4,
      itemCategoryId: id
    });
  }

  //set lại state isItemCategories = itemCategoryItem.id
  function onClickItem(e) {
    return (
      itemCategories.data.map((itemCategoryItem, itemCategoryIndex) => {
        if (e.item.props.children[1] === itemCategoryItem.itemCategoryName) {
          onFilterItemCategory(itemCategoryItem.id)
        }
      })
    );
  }

  function handleShowMore() {
    getProductList({
      more: true,
      page: productList.page + 1,
      limit: 4,
      categoryId: categoryId,
      itemCategoryId: itemCategorySelected,
    });
  }

  //get sản phẩm theo itemCategoryId
  // products = productList.data.filter((productListItem) => {
  //   return productListItem.itemCategoryId.trim().toLowerCase().indexOf(isItemCategories.trim().toLowerCase()) !== -1;
  // });


  function renderSubCategories() {
    if (subCategories.load) return <p>Loading...</p>;
    list.push(<Menu.Item key="a" onClick={onFilterCategory}>Tất cả</Menu.Item>)
    subCategories.data.forEach((subCategoryItem, subCategoryIndex) => {
      if (categoryId === subCategoryItem.categoryId) {
        list.push(<Menu.ItemGroup key={"g-" + subCategoryIndex + 1} title={subCategoryItem.subCategoryName} />)
      }
      itemCategories.data.forEach((itemCategoryItem, itemCategoryIndex) => {
        if (categoryId === subCategoryItem.categoryId
          && subCategoryItem.id === itemCategoryItem.subCategoryId) { // chỉ lấy item của phòng khách
          list.push(<Menu.Item key={itemCategoryIndex + 1}>{itemCategoryItem.itemCategoryName}</Menu.Item>)
        }
      })
    })
    return list
  }

  return (

    <div className="product-container">
      <div className="product-container__shop-header" >
        <div className="shop-header__content">
            <div className="content__format">
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
                <div className="sideBar__categories">
                  <Title level={3}>Danh mục</Title>
                  <div className="categories__menu">
                    <Menu
                      onClick={(e) => onClickItem(e)}
                      style={{ width: 256 }}
                      defaultSelectedKeys={"a"}
                      mode="inline"
                    >
                      {renderSubCategories()}
                    </Menu>
                  </div>
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
  const { subCategories, itemCategories } = state.categoriesReducer;
  const { productList } = state.productReducer;

  return {
    subCategories: subCategories,
    itemCategories: itemCategories,
    productList: productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategories: (params) => dispatch(getSubCategoriesAction(params)),
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),
    getProductList: (params => dispatch(getProductListAction(params))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);