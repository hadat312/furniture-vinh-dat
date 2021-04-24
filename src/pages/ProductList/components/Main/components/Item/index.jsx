import { Button, Card, Col, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import history from '../../../../../../utils/history';
import { ROUTERS } from '../../../../../../constants/router';
import './item.css';
function Item(props) {
  const { id, image, name, description, price, discount, itemInRow } = props;
  const { Meta } = Card;
  const [isAddWishlist, setIsAddWishlist] = useState(false);
  const onAddWishlist = () => {
    setIsAddWishlist(!isAddWishlist);
  }
  const { Title } = Typography;
  const marginBot = {
    marginBottom: 20,
  }
  function renderFourCard() {
    return (
      <Card
        style={{
          width: 250
        }}
        className="main-container__card"
        hoverable
        cover={
          <img
            src={image}
            className="main-container__card__img"
            style={{
              height: "250px"
            }}
            
          />
        }
        // onClick={() => { history.push(`/product/${id}`) }}
      >
        <div onClick={onAddWishlist}>
          {
            isAddWishlist
              ? <AiFillHeart className="main-container__card__add-to-wishlist" />
              : <AiOutlineHeart className="main-container__card__wishlist" />
          }
        </div>
        <div className="card__container">
          <Meta
            title={name}
            className="main-container__card__title" />
          <div>
            <a
              className="main-container__card__add-to-card"
              onClick={() => { history.push(ROUTERS.CART) }}
            >
              + Thêm vào giỏ
          </a>
          </div>
          <div className="main-container__card__price">
            <span className="main-container__card__price__old">{price.toLocaleString()} vnđ</span>
            <span className="main-container__card__price__current">{(price * (1 - discount)).toLocaleString()} vnđ</span>
          </div>
        </div>

      </Card >
    );
  }

  function renderOneCard() {
    return (
      <Row gutter={[24, 8]}>
        <Col span={12}>
          <img
            src={image}
            className="main-container__card__img"
            style={{
              width: "100%",
              height: "auto"
            }}
          />
        </Col>
        <Col span={12}>
          <Row style={marginBot}>
            <Title level={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Title>
          </Row>
          <Row style={marginBot} className="d-flex align-items-center">
            <span className="main-container__card__price__old mr-2">{price.toLocaleString()} vnđ</span>
            <span className="main-container__card__price__current">{(price * (1 - discount)).toLocaleString()} vnđ</span>
          </Row>
          <Row style={marginBot, { textAlign: "justify" }}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aut molestias autem sapiente quae quisquam, velit omnis quas ut nobis vero earum blanditiis accusantium architecto alias numquam ipsum ad quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, aut molestias autem sapiente quae quisquam, velit omnis quas ut nobis vero earum blanditiis accusantium architecto alias numquam ipsum ad quibusdam.</p>
          </Row>
          <Row>
            <Button type="dashed" className="view-detail-btn">Xem chi tiết</Button>
          </Row>
        </Col>
      </Row>
    );
  }
  return (
    // 1-24 4-6
    <>
      <Col
        span={itemInRow}
      >
        {
          itemInRow === 6
            ? renderFourCard()
            : renderOneCard()}

      </Col >
    </>
  );
}

export default Item;