import { Button, notification } from 'antd';
import React, { useEffect } from 'react';
import Item from './components/Item'
import { connect } from 'react-redux';
import {
  getWishListAction,
  deleteWishlistTaskAction,
  addWishListToCartAction,
  addCartTaskAction
} from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';
function WishlistPage({
  cartList,
  wishlist,
  deleteWishlist,
  addCartTask,
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

  function checkItemInCart(wishlistIndex, wishlistId, colorSelected, sizeSelected) {
    /**
     * wishlist và cart không có color và size
     * wishlist và cart không có color
     * wishlist và cart không có size
     * wishlist và cart có cả color và size
     * ...
     */
    let isExist = true;
    cartList.data.map((cartItem, cartIndex) => {
      if (colorSelected.id && sizeSelected.id && cartItem.color.id && cartItem.size.id) {
        if (cartItem.color.id === colorSelected.id && cartItem.size.id === sizeSelected.id && wishlistId === cartItem.productId) {
          return isExist = true; // pass
        } else {
          return isExist = false; // pass
        }
      }
      else if (!cartItem.size.id && !sizeSelected.id && colorSelected.id && cartItem.color.id) {
        if (cartItem.color.id === colorSelected.id && wishlistId === cartItem.productId) {
          return isExist = true; // pass
        } else {
          return isExist = false; // pass
        }
      }
      else if (!cartItem.color.id && !colorSelected.id && cartItem.size.id && sizeSelected.id) {
        if (cartItem.size.id === sizeSelected.id && wishlistId === cartItem.productId) {
          return isExist = true; // pass
        } else {
          return isExist = false; // pass
        }
      }
      else if (!colorSelected.id && !sizeSelected.id && !cartItem.color.id && !cartItem.size.id) {
        if (wishlistId === cartItem.productId) {
          return isExist = true; // pass
        } else {
          return isExist = false; // pass
        }
      }


    })
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
      <table className="cart-table-container container" style={{ marginBottom: 50 }}>
        <thead>
          <tr>
            <th className="product-name" colSpan="2">Product</th>
            <th className="product-price" colSpan="3"> Price</th>
          </tr>
        </thead>
        {renderWishlist()}
      </table>
    </>
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);