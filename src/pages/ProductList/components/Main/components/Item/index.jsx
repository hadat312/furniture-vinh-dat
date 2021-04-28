import { Alert, Button, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { connect } from 'react-redux';
import {
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  addCartTaskAction,
} from '../../../../../../redux/actions';
import history from '../../../../../../utils/history';
import { ROUTERS } from '../../../../../../constants/router';
import './item.css';
function Item(props) {
  const {
    id,
    image,
    name,
    description,
    price,
    discount,
    itemInRow,
    wishlist,
    addWishlistTask,
    deleteWishlistTask,
    addCartTask,
  } = props;

  const { Meta } = Card;
  const [isAddWishlist, setIsAddWishlist] = useState(false);

  const { Title } = Typography;
  const marginBot = {
    marginBottom: 20,
  }
  const itemInfo = {
    id: id,
  };
  
  function toggleWishlist() {
    setIsAddWishlist(!isAddWishlist);
  }

  function onAddWishlistTask() {
    addWishlistTask(itemInfo);
    console.log("thêm vào giỏ thành công");
  }

  function onDeleteWishlistTask(id) {
    wishlist.data.map((item) => {
      if (id === item._id) {
        return deleteWishlistTask({ id: item.id });
      }
    })
    console.log("xóa thành công");
  }

  function onAddCartTask() {
    addCartTask(itemInfo)
    console.log("thêm vào giỏ thành công");
  }

  function renderFourCard() {
    return (
      <>
        <div>
          {
            isAddWishlist
              ? <AiFillHeart
                onClick={() => {
                  toggleWishlist()
                  onDeleteWishlistTask(id);
                }}
                className="main-container__card__add-to-wishlist"
              />
              : <AiOutlineHeart
                onClick={() => {
                  toggleWishlist()
                  onAddWishlistTask()
                }}
                className="main-container__card__wishlist"
              />

          }
        </div>
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
          onClick={() => { history.push(`/product/${id}`) }}
        >

          <div className="card__container">
            <Meta
              title={name}
              className="main-container__card__title" />

            <div className="main-container__card__price">
              <span className="main-container__card__price__old">{price.toLocaleString()} vnđ</span>
              <span className="main-container__card__price__current">{(price * (1 - discount)).toLocaleString()} vnđ</span>
            </div>
          </div>
        </Card >
        <div className="main-container__card__add-to-card">
          <a

            onClick={onAddCartTask}
          >
            + Thêm vào giỏ
          </a>
        </div>
      </>

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
              {name}
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

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  const { cart } = state.cartReducer;
  return {
    wishlist: wishlist,
    cart: cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
    deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);