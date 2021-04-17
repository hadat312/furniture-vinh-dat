import { Card, Col } from 'antd';
import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './item.css';
function Item(props) {
  const { Meta } = Card;
  const oldPriced = 5000000;
  const currentPrice = 2000000;
  const [isAddWishlist, setIsAddWishlist] = useState(false);
  const onAddWishlist = () => {
    setIsAddWishlist(!isAddWishlist);
    console.log("🚀 ~ file: index.jsx ~ line 12 ~ onAddWishlist ~ isAddWishlist", isAddWishlist)
  }
  return (
    <Col span={6}>
      <Card
        className="main-container__card"
        hoverable
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <a onClick={onAddWishlist}>
          {
            isAddWishlist
              ? <AiFillHeart className="main-container__card__add-to-wishlist" />
              : <AiOutlineHeart className="main-container__card__wishlist" />
          }
        </a>
        <Meta title="Europe Street beat" className="main-container__card__title" />
        <a className="main-container__card__add-to-card">
          + Thêm vào giỏ
            </a>
        <div className="main-container__card__price">
          <span className="main-container__card__price__old">{oldPriced.toLocaleString()} vnđ</span>
          <span className="main-container__card__price__current">{currentPrice.toLocaleString()} vnđ</span>
        </div>
      </Card>
    </Col>
  );
}

export default Item;