import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addCartTaskAction } from '../../../../redux/actions'
import history from '../../../../utils/history';
import './styles.css'

function Item({
  wishlistIndex,
  wishlistItem,
  onDeleteWishlist,
  checkItemInCart,
  productListCategoryId
}) {

  const productPrice = (wishlistItem.productPrice + (wishlistItem.color.price || 0) + (wishlistItem.size.price || 0)) * (1 - wishlistItem.productDiscount);

  // const cartColorId = cartItem.color.id || 0;
  // const cartSizeId = cartItem.size.id || 0;
  // const wishlistColorId = wishlistItem.color.id || 0;
  // const wishlistSizeId = wishlistItem.size.id || 0;
  // function checkItemInCart() {
  //   if (
  //     cartColorId === wishlistColorId
  //     && cartSizeId === wishlistSizeId
  //     && cartItem.productId === wishlistItem.productId
  //   ) {
  //     console.log("error");
  //     // showError();
  //     // onAddToCart(wishlistIndex, wishlistItem.color, wishlistItem.size);
  //   } else {
  //     console.log("add");
  //   }
  // }

  return (
    <>
      <tbody>
        <tr>
          <td className="product-thumbnail">
            <img
              style={{ cursor: 'pointer' }}
              src={wishlistItem.productImage}
              alt=""
              onClick={() => history.push(`/home/${productListCategoryId}/${wishlistItem.productId}`)}
            />
          </td>
          <td
            className="product-name"
            style={{ width: 450, cursor: 'pointer' }}
            onClick={() => history.push(`/home/${productListCategoryId}/${wishlistItem.productId}`)}
          >
            <div>{wishlistItem.productName}</div>
            {wishlistItem.color.colorName && <div>Màu: {wishlistItem.color.colorName}</div>}
            {wishlistItem.size.sizeName && <div>Kích thước: {wishlistItem.size.sizeName}</div>}
          </td>
          <td className="product-price">
            <div>{productPrice.toLocaleString() + " vnđ"}</div>
          </td>

          <td className="wishlist-add">
            <button className="btn-add">
              {

              }
              <span onClick={() => checkItemInCart(wishlistIndex, wishlistItem.productId, wishlistItem.color, wishlistItem.size)}>Thêm vào giỏ</span>
            </button>
          </td>

          <td className="button-remove">
            <button className="btn-remove">
              <span onClick={() => onDeleteWishlist(wishlistIndex)}>X</span>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}


const mapStateToProps = (state) => {
  // const { productList } = state.productReducer;
  const { wishlist } = state.wishlistReducer;
  return {
    // productList: productList,1
    wishlist: wishlist,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    addCartTask: (params) => dispatch(addCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);