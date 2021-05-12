import { Alert, Button, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { connect } from 'react-redux';
import {
  addWishlistTaskAction,
  deleteWishlistTaskAction,
  getCartAction,
  addCartTaskAction,
  editCartTaskAction
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
    cart,
    getCart,
    addCartTask,
    editCartTask,
  } = props;

  const { Meta } = Card;
  const [isAddWishlist, setIsAddWishlist] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // get data từ localStorage để kiểm tra
  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) ||{};
  console.log("🚀 ~ file: index.jsx ~ line 40 ~ Item ~ userInfoLocalStorage", userInfoLocalStorage.id)

  const { Title } = Typography;
  const marginBot = {
    marginBottom: 20,
  }
  const itemInfo = {
    id: id,
    name: name,
    image: image,
    price: price,
    discount: discount,
    quantity: quantity,
    userId: userInfoLocalStorage.id
  };

  const [isShowAlert, setIsShowAlert] = useState(false);

  useEffect(() => {
    getCart();
  }, [])




  function toggleWishlist() {
    if (userInfoLocalStorage !== null) {
      setIsAddWishlist(!isAddWishlist);
    }
  }

  function onAddWishlistTask() {
    if (userInfoLocalStorage !== null) {
      addWishlistTask(itemInfo);
      alert("Thêm vào danh sách yêu thích thành công!");
      console.log("Thêm vào danh sách yêu thích thành công!");
    }
    else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    }
  }

  function onDeleteWishlistTask() {
    if (userInfoLocalStorage !== null) {
      wishlist.data.map((item) => {
        if (id === item._id) {
          return deleteWishlistTask({ id: item.id });
        }
      })
      alert("xóa khỏi danh sách yêu thích thành công!");
      console.log("xóa khỏi danh sách yêu thích thành công!");
    }
    else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    }
  }

  //UPDATE QUANTITY OF ITEM IN CART
  function checkIdAndAddTask() {
    if (userInfoLocalStorage !== null) {
      let isNotMatch = true;
      //Không có sản phẩm trong cart
      if (cart.data.length === 0) {
        addCartTask(itemInfo);
        console.log("Thêm vào giỏ thành công");
        alert("Thêm vào giỏ thành công");
        // setTimeout(() => {
        //   setIsShowAlert(true)
        // }, 2000)
        // <Alert message="Thêm vào giỏ thành công" type="success" />
      } else {
        //Có sản phẩm trong giỏ
        cart.data.map((cartItem) => {
          //Kiểm tra xem đã thêm sản phẩm hiện tại vào giỏ chưa
          if (id === cartItem._id) {
            const updateItem = {
              quantity: cartItem.quantity += 1
            };
            console.log("Đã cập nhật giỏ hàng");
            alert("Đã cập nhật giỏ hàng");
            isNotMatch = false;
            editCartTask({ id: cartItem.id, ...updateItem });
          }
        })
        //Sản phẩm hiện tại không trùng với các sản phẩm trong giỏ
        if (isNotMatch) {
          alert("Thêm vào giỏ thành công");
          console.log("Thêm vào giỏ thành công");
          addCartTask(itemInfo);
          // setTimeout(() => {
          //    setIsShowAlert(true)
          // }, 1000)
        }
      }
    } else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
      console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
    }

  }

  function renderFourCard() {
    return (
      <>
        <div>
          {discount * 100} %
        </div>
        <div>
          {
            isAddWishlist
              ? <AiFillHeart
                onClick={() => {
                  toggleWishlist();
                  onDeleteWishlistTask();
                }}
                className="main-container__card__add-to-wishlist"
              />
              : <AiOutlineHeart
                onClick={() => {
                  toggleWishlist();
                  onAddWishlistTask();
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
          <a onClick={checkIdAndAddTask}>+ Thêm vào giỏ</a>
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
            <Button
              type="dashed"
              className="view-detail-btn"
              onClick={() => { history.push(`/product/${id}`) }}
            >
              Xem chi tiết
            </Button>
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
    wishlist,
    cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
    deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
    getCart: (params) => dispatch(getCartAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
    editCartTask: (params) => dispatch(editCartTaskAction(params)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);