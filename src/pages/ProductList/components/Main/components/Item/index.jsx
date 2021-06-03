import { Alert, Button, Card, Col, Row, Typography,Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { connect } from 'react-redux';
import {
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  addCartTaskAction,
  editCartTaskAction,
} from '../../../../../../redux/actions';
import history from '../../../../../../utils/history';
import { ROUTERS } from '../../../../../../constants/router';
import './item.css';
function Item({
  // sizeId,
  // colorId,
  // colorName,
  // sizeName,
  // initialColorPrice,
  // initialSizePrice,

  itemInRow,
  productListItem,
  categoryId,
  averageRate
  // wishlist,
  // cartList,

  // addWishlistTask,
  // deleteWishlistTask,
  // addCartTask,
  // editCartTask,
}) {

  const { Meta } = Card;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const [isAddWishlist, setIsAddWishlist] = useState(false);

  const { Title } = Typography;
  const marginBot = {
    marginBottom: 20,
  }
  let originPrice = 0;
  let initialPrice = 0;

  if (productListItem.colors.length === 0 && productListItem.sizes.length === 0) {
    originPrice = productListItem.productPrice.toLocaleString();
    initialPrice = (productListItem.productPrice * (1 - productListItem.productDiscount)).toLocaleString();
  } else if (productListItem.colors.length === 0) {
    originPrice = ((productListItem.productPrice + productListItem.sizes[0].price)).toLocaleString();
    initialPrice = ((productListItem.productPrice + productListItem.sizes[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
  } else if (productListItem.sizes.length === 0) {
    originPrice = ((productListItem.productPrice + productListItem.colors[0].price)).toLocaleString();
    initialPrice = ((productListItem.productPrice + productListItem.colors[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
  } else {
    originPrice = ((productListItem.productPrice + productListItem.colors[0].price + productListItem.sizes[0].price)).toLocaleString();
    initialPrice = ((productListItem.productPrice + productListItem.colors[0].price + productListItem.sizes[0].price) * (1 - productListItem.productDiscount)).toLocaleString();
  }

  function renderFourCard() {
    return (
      <>
        <Col span={6}>
          <Card
            style={{
              // width: 250
            }}
            className="main-container__card"
            hoverable
            cover={
              <>{
                productListItem.productDiscount > 0 && (
                  <div className="main-container__card__discount" style={{ width: '50px', height: '50px' }}>
                    {-productListItem.productDiscount * 100} %
                  </div>
                )
              }

                <img
                  src={productListItem.productImage[0]}
                  className="main-container__card__img"
                  style={{
                    height: "250px"
                  }}
                />
              </>
            }
            onClick={() => { history.push(`/home/${categoryId}/${productListItem.id}`) }}
          >

            <div className="card__container">
              <Meta
                title={<span className="main-container__card__title">{productListItem.productName}</span>}
              />

              <div className="main-container__card__price">
                <span className="main-container__card__price__old">{originPrice} vnđ</span>
                <span className="main-container__card__price__current">{initialPrice} vnđ</span>
                <Rate  disabled value={averageRate} />
              </div>
            </div>
          </Card >
        </Col >
      </>

    );
  }
  function renderOneCard() {
    return (
      <>
        <Col span={12}>
          <img
            src={productListItem.productImage[0]}
            // className="main-container__card__img"
            style={{
              width: "100%",
              height: "auto"
            }}
          />
        </Col>
        <Col span={12}>
          <Row style={marginBot}>
            <Title level={2}>
              {productListItem.productName}
            </Title>
          </Row>
          <Row style={marginBot} className="d-flex align-items-center">
            <span className="main-container__card__price__old mr-2">{originPrice} vnđ</span>
            <span className="main-container__card__price__current">{initialPrice} vnđ</span>
            <Rate  disabled value={averageRate} />
          </Row>
          <Row style={marginBot, { textAlign: "justify" }}>
            <p>{productListItem.productShortDescription}</p>
          </Row>
          <Row>
            <Button
              type="primary"
              className="view-detail-btn"
              onClick={() => { history.push(`/product/${productListItem.id}`) }}
            >
              Xem chi tiết
            </Button>

          </Row>
        </Col>
      </>

    );
  }
  return (
    // 1-24 4-6
    <>
      {
        itemInRow === 6
          ? renderFourCard()
          : renderOneCard()
      }
    </>
  );
}
export default Item;