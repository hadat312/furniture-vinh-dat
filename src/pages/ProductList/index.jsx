import { Col, Input, Row, Space, Typography, Menu, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCategoriesAction,
  getSubCategoriesAction,
  getItemCategoriesAction
} from '../../redux/actions';
import Main from './components/Main';
import FilterContent from './components/FilterContent';
import './productList.css';

function ProductListPage(props) {
  const list = [];
  const { Title } = Typography;
  const {
    getCategories,
    getSubCategories,
    getItemCategories,
    getProductList,
    categories,
    subCategories,
    itemCategories,
    productList,
    // categoríesID 
  } = props;
  const categoryId = "category01";
  let itemCategoryId = "";
  const [id, setID] = useState("category01");
  const [searchKey, setSearchKey] = useState("");
  const [isShowFilterContent, setIsShowFilterContent] = useState(false);
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceDecrease, setPriceDecrease] = useState(0)
  const [isItemCategories, setIsItemCategories] = useState("itemCategory01");
  const [itemInRow, setItemInRow] = useState(6);



  // Check login hay chua
  // localStorage.setItem("userId", JSON.stringify("123"));
  // const abc = JSON.parse(localStorage.getItem("userId"));
  // function xxx() {
  //   if (abc !== null) {
  //     console.log("ok");
  //   }
  //   else{
  //     console.log("not ok");
  //   }
  // }

  useEffect(() => {
    getCategories();
    getSubCategories();
    getItemCategories();
  }, []);

  function getItemCategoryId() {
    subCategories.data.forEach((subCategoryItem, subCategoryIndex) => {
      return (
        itemCategories.data.forEach((itemCategoryItem, itemCategoryIndex) => {
          if (categoryId === subCategoryItem.categoryId
            && subCategoryItem.id === itemCategoryItem.subCategoryId) { // chỉ lấy item của phòng khách
            return itemCategoryId = itemCategoryItem.id;
          }
        })
      );
    })
  }
  const filterContentToggle = () => {
    setIsShowFilterContent(!isShowFilterContent);
  }

  //truyền hàm xuống component ở line 141, truyền productList xuống component ở line 179
  const sortDescendingByPrice = () => {
    productList.data.sort((itemInIndex0, itemInIndex1) => {
      return itemInIndex1.productPrice * (1 - itemInIndex1.productDiscount) - itemInIndex0.productPrice * (1 - itemInIndex0.productDiscount);
    })
  }

  const sortAscendingByPrice = () => {
    productList.data.sort((itemInIndex0, itemInIndex1) => {
      return itemInIndex0.productPrice * (1 - itemInIndex0.productDiscount) - itemInIndex1.productPrice * (1 - itemInIndex1.productDiscount);
    })
  }

  function onClickItem(e) {
    // console.log(e.key);
    return (
      itemCategories.data.map((itemCategoryItem, itemCategoryIndex) => {
        if (e.item.props.children[1] === itemCategoryItem.itemCategoryName) {
          setIsItemCategories(itemCategoryItem.id);
        }
      })
    );
  }


  function renderSubCategories() {
    if (subCategories.load) return <p>Loading...</p>;
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

  const filterProducts = productList.data.filter((productListItem) => {
    return productListItem.productName.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });



  return (
    <div className="product-container">
      <div className="product-container__shop-header">
        <div className="shop-header__content">
          <Row>
            <Col span={4}></Col>
            <Col span={4} className="content__number-of-pages">
              {/* SỐ TRANG */}
              <div>
                Number of pages
              </div>
            </Col>
            <Col span={12} className="content__format">
              <div className="d-flex" style={{ fontSize: "30px" }}>
                {/* <Button className="content__format__button-3-item" focusable={true}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
                </Button> */}
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
            </Col>
            <Col span={4} className="content__filter">
              <div>
                <Button className="content__filter__button" onClick={filterContentToggle}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M208 400h96v-47.994h-96V400zM32 112v47.994h448V112H32zm80 168.783h288v-49.555H112v49.555z"></path></svg>
                  <span className="content__filter__button__title">Filter</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div >
        {getItemCategoryId()}
        {/* TOGGLE FILTER */}
        {isShowFilterContent
          ?
          <FilterContent
            sortDescendingByPrice={sortDescendingByPrice}
            sortAscendingByPrice={sortAscendingByPrice}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
          />
          : null
        }
      </div>
      <div className="product-container__shop-body">
        <Row>
          <Col span={2}></Col>
          <Col span={4} className="">
            <div className="shop-body__sideBar">
              <Space direction="vertical">
                <Input.Search
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="input-search-content"
                />
                <div className="sideBar__categories">
                  <Title level={3}>Danh mục</Title>
                  <div className="categories__menu">
                    <Menu
                      onClick={(e) =>
                        onClickItem(e)
                      }
                      style={{ width: 256 }}
                      defaultSelectedKeys={['1']}
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
            <div classNames="shop-body__main">
              {/* HIỂN THỊ SẢN PHẨM */}
              <Main
                isItemCategories={isItemCategories}
                itemInRow={itemInRow}
                sizeFilter={sizeFilter}
                getProductList={getProductList}
                productList={filterProducts}
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
  const { categories, subCategories, itemCategories } = state.categoriesReducer;
  const { productList } = state.productReducer;
  return {
    categories: categories,
    subCategories: subCategories,
    itemCategories: itemCategories,
    productList: productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (params) => dispatch(getCategoriesAction(params)),
    getSubCategories: (params) => dispatch(getSubCategoriesAction(params)),
    getItemCategories: (params) => dispatch(getItemCategoriesAction(params)),
    getProductList: (params => dispatch(getProductListAction(params))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);