import { Button, notification } from 'antd';
import React, { useEffect } from 'react';
import Item from './components/Item'
import { connect } from 'react-redux';
import {
  getWishListAction,
  deleteWishlistTaskAction,
  addWishListToCartAction,
  addCartTaskAction,
  clearWishListTaskAction
} from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';
import { AiOutlineHeart } from "react-icons/ai";

import './wishlist.css';
function WishlistPage({
  cartList,
  wishlist,
  deleteWishlist,
  addCartTask,
  clearWishList
}) {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const key = `open${Date.now()}`;

  function showError() {
    const key = `open${Date.now()}`;
    return notification.warning({
      message: 'Đã có sản phẩm này trong giỏ!',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function handleClearWishlistTask() {
    if (userInfo) {
      clearWishList({ userId: userInfo.id })
    } else {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            Đăng nhập ngay
          </Button>
        ),
      });
    }
  }

  function checkItemInCart(wishlistIndex, wishlistId, colorSelected, sizeSelected) {
    /**
     * wishlist và cart không có color và size
     * wishlist và cart không có color
     * wishlist và cart không có size
     * wishlist và cart có cả color và size
     * ...
     */
    let isExist = true;

    if (cartList.data.length > 0) {

      console.log("tồn tại item trong cart");
      cartList.data.forEach((cartItem, cartIndex) => {
        if (colorSelected.id && sizeSelected.id && cartItem.color.id && cartItem.size.id) {
          if (cartItem.color.id === colorSelected.id && cartItem.size.id === sizeSelected.id && wishlistId === cartItem.productId) {
            isExist = true; // pass
          } else {
            isExist = false; // pass
          }
        }
        else if (!cartItem.size.id && !sizeSelected.id && colorSelected.id && cartItem.color.id) {
          if (cartItem.color.id === colorSelected.id && wishlistId === cartItem.productId) {
            isExist = true; // pass
          } else {
            isExist = false; // pass
          }
        }
        else if (!cartItem.color.id && !colorSelected.id && cartItem.size.id && sizeSelected.id) {
          if (cartItem.size.id === sizeSelected.id && wishlistId === cartItem.productId) {
            isExist = true; // pass
          } else {
            isExist = false; // pass
          }
        }
        else if (!colorSelected.id && !sizeSelected.id && !cartItem.color.id && !cartItem.size.id) {
          if (wishlistId === cartItem.productId) {
            isExist = true; // pass
          } else {
            isExist = false; // pass
          }
        }
      })
    } else if (cartList.data.length === 0) {
      console.log("ko tồn tại item trong cart");
      isExist = false; // pass
    }

    console.log('isExist', isExist);

    if (isExist) {
      // console.log("error");
      showError();
      // console.log("true: ", isExist);
    } else {
      console.log("added");
      onAddToCart(wishlistIndex, colorSelected, sizeSelected);
      // console.log("false: ", isExist);
    }
  }

  function onAddToCart(wishlistIndex, colorSelected, sizeSelected) {
    //color, size đều không có
    //chỉ có color
    //chỉ có size
    //có cả 2
    //nếu không có cart và cả size
    if (!userInfo) {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            Đăng nhập ngay
          </Button>
        ),
      });
    }
    const cartInfo = {
      id: wishlist.data[wishlistIndex].id,
      productId: wishlist.data[wishlistIndex].productId,
      productQuantity: 1,
      productName: wishlist.data[wishlistIndex].productName,
      productImage: wishlist.data[wishlistIndex].productImage,
      productPrice: wishlist.data[wishlistIndex].productPrice,
      productDiscount: wishlist.data[wishlistIndex].productDiscount,
    }
    if (!colorSelected.id && !sizeSelected.id) { //ko có size và color
      addCartTask({
        userId: userInfo.id,
        carts: [
          ...cartList.data,
          {
            ...cartInfo,
            color: {},
            size: {}
          }
        ]
      })
      notification.success({
        message: 'Thêm vào giỏ thành công',
        key,
        placement: 'bottomRight',
        duration: 2
      });

    } else if (!colorSelected.id) { // nếu chỉ có size
      addCartTask({
        userId: userInfo.id,
        carts: [
          ...cartList.data,
          {
            ...cartInfo,
            color: {},
            size: {
              id: sizeSelected.id,
              sizeName: sizeSelected.sizeName,
              price: sizeSelected.price
            }
          }
        ]
      })
      notification.success({
        message: 'Thêm vào giỏ thành công',
        key,
        placement: 'bottomRight',
        duration: 2
      });
    } else if (!sizeSelected.id) { // nếu chỉ có color
      addCartTask({
        userId: userInfo.id,
        carts: [
          ...cartList.data,
          {
            ...cartInfo,
            color: {
              id: colorSelected.id,
              colorName: colorSelected.colorName,
              price: colorSelected.price
            },
            size: {}
          }
        ]
      })
      notification.success({
        message: 'Thêm vào giỏ thành công',
        key,
        placement: 'bottomRight',
        duration: 2
      });
    }
    else {//có cả color và size
      addCartTask({
        userId: userInfo.id,
        carts: [
          ...cartList.data,
          {
            ...cartInfo,
            color: {
              id: colorSelected.id,
              colorName: colorSelected.colorName,
              price: colorSelected.price
            },
            size: {
              id: sizeSelected.id,
              sizeName: sizeSelected.sizeName,
              price: sizeSelected.price
            }
          }
        ]
      })
      notification.success({
        message: 'Thêm vào giỏ thành công',
        key,
        placement: 'bottomRight',
        duration: 2,
      });
    }
  }

  function onDeleteWishlist(wishlistIndex) {
    const newWishlist = wishlist.data;
    newWishlist.splice(wishlistIndex, 1)
    deleteWishlist({
      userId: userInfo.id,
      wishlist: [
        ...newWishlist,
      ]
    })
    notification.success({
      message: 'xóa sản phẩm thành công',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function renderWishlist() {
    if (wishlist.load) return <p>Loading...</p>;
    return (
      wishlist.data.map((wishlistItem, wishlistIndex) => {
        return (
          <>
            <Item
              key={wishlistItem.productId}
              wishlistIndex={wishlistIndex}
              wishlistItem={wishlistItem}
              cartItem={cartList.data[wishlistIndex]}
              checkItemInCart={checkItemInCart}
              onDeleteWishlist={onDeleteWishlist}
              userInfo={userInfo}
            />
            <hr />
          </>
        );
      })
    );
  }

  return (
    <>
      {
        wishlist.data.length === 0
          ? (
            <div className="empty-wishlist-container">
              <AiOutlineHeart className="empty-wishlist-container__heart-icon" />
              <div className="empty-wishlist-container__title">
                <p>Chưa có danh mục yêu thích</p>
                <p>Thêm sản phẩm vào danh sách yêu thích để hiển thị ở đây.</p>
              </div>
              <button className="btn-shopping" onClick={() => history.push(ROUTERS.LIVING_ROOM)}>
                Tiếp tục mua sắm
          </button>
            </div>
          )
          : (
            <>
              <div className="wishlist-container">
                <table className="wishlist-container__wishlist-table-container">
                  <thead>
                    <tr>
                      <th className="wishlist-table-container__product-name" colSpan="2">Tên sản phẩm</th>
                      <th className="wishlist-table-container__product-price" colSpan="3">Giá tiền</th>
                    </tr>
                  </thead>
                  {renderWishlist()}
                </table>
                <div className="wishlist-container__btn">
                  <button className="wishlist-container__btn__btn-clear" onClick={() => handleClearWishlistTask()}>XÓA TOÀN BỘ</button>
                </div>
              </div>
            </>
          )
      }
    </>
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  console.log("🚀 ~ file: index.jsx ~ line 319 ~ mapStateToProps ~ wishlist", wishlist)
  const { cartList } = state.cartReducer;
  return {
    wishlist: wishlist,
    cartList: cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishList: (params) => dispatch(getWishListAction(params)),
    deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params)),
    addCartTask: (params) => dispatch(addCartTaskAction(params)),
    addWishListToCart: (params) => dispatch(addWishListToCartAction(params)),

    clearWishList: (params) => dispatch(clearWishListTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);