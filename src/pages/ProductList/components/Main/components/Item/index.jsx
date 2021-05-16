import { Alert, Button, Card, Col, Row, Typography } from 'antd';
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

  // function toggleWishlist() {
  //   if (userInfo !== null) {
  //     setIsAddWishlist(!isAddWishlist);

  //   }
  // }

  // function onAddWishlistTask() {
  //   const itemInfo = {
  //     // userId: userInfo.id,
  //     // productId: productListItem.id,
  //     // productName: productListItem.productName,
  //     // productImage: productListItem.productImage,
  //     // productPrice: productListItem.productPrice,
  //     // productDiscount: productListItem.productDiscount,
  //     // productQuantity: 1,
  //     // color: {
  //     //   id: productListItem.colors[0].id,
  //     //   colorName: productListItem.colors[0].colorName,
  //     //   price: productListItem.colors[0].price,
  //     // },
  //     // size: {
  //     //   id: productListItem.colors[0].id,
  //     //   sizeName: productListItem.colors[0].sizeName,
  //     //   price: productListItem.colors[0].price
  //     // },
  //   };
  //   if (userInfo !== null) {
  //     addWishlistTask(itemInfo);
  //     // alert("Thêm vào danh sách yêu thích thành công!");
  //     console.log("Thêm vào danh sách yêu thích thành công!");
  //   }
  //   else {
  //     // alert("Vui lòng đăng nhập để thực hiện thao tác này!");
  //     console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
  //   }
  // }

  // function onDeleteWishlistTask() {
  //   if (userInfo !== null) {
  //     wishlist.data.map((item) => {
  //       if (productListItem.id === item._id) {
  //         return deleteWishlistTask({ id: item.id });
  //       }
  //     })
  //     // alert("xóa khỏi danh sách yêu thích thành công!");
  //     console.log("xóa khỏi danh sách yêu thích thành công!");
  //   }
  //   else {
  //     // alert("Vui lòng đăng nhập để thực hiện thao tác này!");
  //     console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
  //   }
  // }

  //UPDATE QUANTITY OF ITEM IN CART
  // function checkIdAndAddTask() {
  //   const itemInfo = {
  //     id: productListItem.id,
  //     name: productListItem.productName,
  //     image: productListItem.productImage,
  //     price: productListItem.productPrice,
  //     discount: productListItem.productDiscount,
  //     quantity: productListItem.productQuantity,
  //     userId: userInfo.id
  //   }
  //   if (userInfo !== null) {
  //     const isNotMatch = true;
  //     //Không có sản phẩm trong cart
  //     if (cart.data.length === 0) {
  //       addCartTask(itemInfo);
  //       console.log("Thêm vào giỏ thành công");
  //       alert("Thêm vào giỏ thành công");
  //     } else {
  //       //Có sản phẩm trong giỏ
  //       cart.data.map((cartItem) => {
  //         //Kiểm tra xem đã thêm sản phẩm hiện tại vào giỏ chưa
  //         if (productListItem.id === cartItem._id) {
  //           const updateItem = {
  //             quantity: cartItem.quantity += 1
  //           };
  //           console.log("Đã cập nhật giỏ hàng");
  //           alert("Đã cập nhật giỏ hàng");
  //           isNotMatch = false;
  //           editCartTask({ id: cartItem.id, ...updateItem });
  //         }
  //       })
  //       //Sản phẩm hiện tại không trùng với các sản phẩm trong giỏ
  //       if (isNotMatch) {
  //         alert("Thêm vào giỏ thành công");
  //         console.log("Thêm vào giỏ thành công");
  //         addCartTask(itemInfo);
  //       }
  //     }
  //   } else {
  //     alert("Vui lòng đăng nhập để thực hiện thao tác này!");
  //     console.log("Vui lòng đăng nhập để thực hiện thao tác này!");
  //   }

  // }

  // function onAddToCart() {
  //   if (productListItem.colors.length === 0 && productListItem.sizes.length === 0) {
  //     const existProductIndex = cartList.data.findIndex((item) => item.productId === productListItem.id);
  //     if (existProductIndex !== -1) {
  //       const newCart = cartList.data;
  //       newCart.splice(existProductIndex, 1, {
  //         productId: productListItem.id,
  //         productName: productListItem.productName,
  //         productImage: productListItem.productImage,
  //         productPrice: productListItem.productPrice,
  //         productQuantity: cartList.data[existProductIndex].productQuantity + 1,
  //         productDiscount: productListItem.productDiscount,
  //         color: {},
  //         size: {},
  //       })
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: newCart
  //       })
  //     } else {
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: productListItem.id,
  //             productName: productListItem.productName,
  //             productImage: productListItem.productImage,
  //             productPrice: productListItem.productPrice,
  //             productQuantity: 1,
  //             productDiscount: productListItem.productDiscount,
  //             color: {},
  //             size: {},
  //           }
  //         ]
  //       })
  //     }
  //   }
  //   else if (productListItem.colors.length === 0) {
  //     const existProductIndex = cartList.data.findIndex((item) => item.productId === productListItem.id);
  //     if (existProductIndex !== -1) {
  //       const newCart = cartList.data;
  //       newCart.splice(existProductIndex, 1, {
  //         productId: productListItem.id,
  //         productName: productListItem.productName,
  //         productImage: productListItem.productImage,
  //         productPrice: productListItem.productPrice,
  //         productQuantity: cartList.data[existProductIndex].productQuantity + 1,
  //         productDiscount: productListItem.productDiscount,
  //         color: {},
  //         size: {
  //           id: productListItem.colors[0].id,
  //           sizeName: productListItem.colors[0].sizeName,
  //           price: productListItem.colors[0].price
  //         },
  //       })
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: newCart
  //       })
  //     } else {
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: productListItem.id,
  //             productName: productListItem.productName,
  //             productImage: productListItem.productImage,
  //             productPrice: productListItem.productPrice,
  //             productQuantity: 1,
  //             productDiscount: productListItem.productDiscount,
  //             color: {},
  //             size: {
  //               id: productListItem.colors[0].id,
  //               sizeName: productListItem.colors[0].sizeName,
  //               price: productListItem.colors[0].price
  //             },
  //           }
  //         ]
  //       })
  //     }
  //   } else if (productListItem.sizes.length === 0) {
  //     const existProductIndex = cartList.data.findIndex((item) => item.productId === productListItem.id);
  //     if (existProductIndex !== -1) {
  //       const newCart = cartList.data;
  //       newCart.splice(existProductIndex, 1, {
  //         productId: productListItem.id,
  //         productName: productListItem.productName,
  //         productImage: productListItem.productImage,
  //         productPrice: productListItem.productPrice,
  //         productQuantity: cartList.data[existProductIndex].productQuantity + 1,
  //         productDiscount: productListItem.productDiscount,
  //         color: {
  //           id: productListItem.colors[0].id,
  //           colorName: productListItem.colors[0].colorName,
  //           price: productListItem.colors[0].price,
  //         },
  //         size: {},
  //       })
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: newCart
  //       })
  //     } else {
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: productListItem.id,
  //             productName: productListItem.productName,
  //             productImage: productListItem.productImage,
  //             productPrice: productListItem.productPrice,
  //             productQuantity: 1,
  //             productDiscount: productListItem.productDiscount,
  //             color: {
  //               id: productListItem.colors[0].id,
  //               colorName: productListItem.colors[0].colorName,
  //               price: productListItem.colors[0].price,
  //             },
  //             size: {},
  //           }
  //         ]
  //       })
  //     }
  //   }
  //   else {
  //     const existProductIndex = cartList.data.findIndex((item) => item.productId === productListItem.id);
  //     if (existProductIndex !== -1) {
  //       const newCart = cartList.data;
  //       newCart.splice(existProductIndex, 1, {
  //         productId: productListItem.id,
  //         productName: productListItem.productName,
  //         productImage: productListItem.productImage,
  //         productPrice: productListItem.productPrice,
  //         productQuantity: cartList.data[existProductIndex].productQuantity + 1,
  //         productDiscount: productListItem.productDiscount,
  //         color: {
  //           id: productListItem.colors[0].id,
  //           colorName: productListItem.colors[0].colorName,
  //           price: productListItem.colors[0].price,
  //         },
  //         size: {
  //           id: productListItem.colors[0].id,
  //           sizeName: productListItem.colors[0].sizeName,
  //           price: productListItem.colors[0].price
  //         },
  //       })
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: newCart
  //       })
  //     } else {
  //       addCartTask({
  //         orderId: cartList.orderId,
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: productListItem.id,
  //             productName: productListItem.productName,
  //             productImage: productListItem.productImage,
  //             productPrice: productListItem.productPrice,
  //             productQuantity: 1,
  //             productDiscount: productListItem.productDiscount,
  //             color: {
  //               id: productListItem.colors[0].id,
  //               colorName: productListItem.colors[0].colorName,
  //               price: productListItem.colors[0].price,
  //             },
  //             size: {
  //               id: productListItem.colors[0].id,
  //               sizeName: productListItem.colors[0].sizeName,
  //               price: productListItem.colors[0].price
  //             },
  //           }
  //         ]
  //       })
  //     }
  //   }

  // }


  function renderFourCard() {
    return (
      <>
        <div>
          {productListItem.productDiscount * 100} %
        </div>
        {/* <div>
          {
            isAddWishlist
              ? <AiFillHeart
                onClick={() => {
                  toggleWishlist();
                  onDeleteWishlistTask();
                }}
                className="main-container__four-card__add-to-wishlist"
              />
              : <AiOutlineHeart
                onClick={() => {
                  toggleWishlist();
                  onAddWishlistTask();
                }}
                className="main-container__four-card__remove-from-wishlist"
              />

          }
        </div> */}
        <Card
          style={{
            width: 250
          }}
          className="main-container__card"
          hoverable
          cover={
            <img
              src={productListItem.productImage}
              className="main-container__card__img"
              style={{
                height: "250px"
              }}

            />
          }
          onClick={() => { history.push(`/product/${productListItem.id}`) }}
        >

          <div className="card__container">
            <Meta
              title={productListItem.productName}
              className="main-container__card__title" />

            <div className="main-container__card__price">
              <span className="main-container__card__price__old">{originPrice} vnđ</span>
              <span className="main-container__card__price__current">{initialPrice} vnđ</span>
            </div>
          </div>
        </Card >
        {/* <div className="main-container__card__add-to-card">
          <a
            onClick={() => onAddToCart()}
          >+ Thêm vào giỏ</a>
        </div> */}
      </>

    );
  }

  function renderOneCard() {
    return (
      <Row gutter={[24, 8]}>
        <Col span={12}>
          <img
            src={productListItem.productImage}
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
              {productListItem.productName}
            </Title>
          </Row>
          <Row style={marginBot} className="d-flex align-items-center">
            <span className="main-container__card__price__old mr-2">{originPrice} vnđ</span>
            <span className="main-container__card__price__current">{initialPrice} vnđ</span>
            {/* {
              isAddWishlist
                ? <AiFillHeart
                  className="main-container__one-card__add-to-wishlist"
                  onClick={() => {
                    toggleWishlist();
                    onDeleteWishlistTask();
                  }}
                />
                : <AiOutlineHeart
                  className="main-container__one-card__remove-from-wishlist"
                  onClick={() => {
                    toggleWishlist();
                    onAddWishlistTask();
                  }}
                />
            } */}
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
            {/* <Button
              type="default"
              className="view-detail-btn"
              onClick={() => onAddToCart()}
            >
              Thêm vào giỏ
            </Button> */}

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

// const mapStateToProps = (state) => {
//   const { wishlist } = state.wishlistReducer;
//   const { cartList } = state.cartReducer;
//   return {
//     wishlist,
//     cartList
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addWishlistTask: (params) => dispatch(addWishlistTaskAction(params)),
//     deleteWishlistTask: (params) => dispatch(deleteWishlistTaskAction(params)),
//     addCartTask: (params) => dispatch(addCartTaskAction(params)),
//     editCartTask: (params) => dispatch(editCartTaskAction(params)),

//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Item);
export default Item;