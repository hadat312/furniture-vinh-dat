import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {addCartTaskAction} from '../../../../redux/actions'

import './styles.css'

function Item(props) {
  const { productItem,
    wishlistItem,
    onDeleteWishlist,
    addCart,
    // id,
    // image,
    // price
  } = props;


  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) ||{};

  const itemInfo = {
    id: wishlistItem._id,
    wishlistId: wishlistItem.id,
    quantity: wishlistItem.quantity,
    image: wishlistItem.image,
    price: wishlistItem.price, 
    userId: userInfoLocalStorage.id
  }
  console.log("🚀 ~ file: index.jsx ~ line 27 ~ Item ~ itemInfo", itemInfo)

  function addCartTask() {
    addCart(itemInfo);
    console.log("thêm vào giỏ thành công");
  }
  return (
    <>

      <tbody>
        <tr>
          <td className="product-thumbnail">
            <img src={wishlistItem.image} alt="" />
            {/* {console.log("🚀 ~ file: index.jsx ~ line 22 ~ Item ~ productItem.image", productItem.image)} */}
          </td>
          <td className="product-name">{productItem.productName}</td>
          <td className="product-price">
            {wishlistItem.price
              ? <div> {wishlistItem.price.toLocaleString()}</div>
              : <div>{(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
            }
          </td>

          <td className="wishlist-remove">
            <button className="btn-add">
              <span onClick={() => addCartTask()}>ADDED</span>
            </button>
          </td>

          <td className="product-remove">
            <button className="delete-product">
              <span onClick={() => onDeleteWishlist(wishlistItem._id)}>X</span>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}


const mapStateToProps = (state) => {
  const { productList } = state.productReducer;
  const { wishlist } = state.wishlistReducer;
  return {
    productList: productList,
    wishlist: wishlist,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params)),
    addCart: (params) => dispatch(addCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);