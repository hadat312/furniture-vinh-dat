import { Button, notification } from 'antd';
import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';

import { editCartTaskAction, deleteCartTaskAction } from '../../../../redux/actions';


import './styles.css';

function Item({
  productItem,
  onDeleteCart,
  onUpdateQuantity,
  cartItem,
  cartIndex,
  editCart
}) {

  const [quantity, setQuantity] = useState(cartItem.productQuantity);
  // const productPrice = 0;
  const productPrice = (cartItem.productPrice + (cartItem.color.price || 0) + (cartItem.size.price || 0)) * (1 - cartItem.productDiscount);

  function cong() {
    let newQuantity = quantity + 1;
    onUpdateQuantity(cartIndex, newQuantity, cartItem.color, cartItem.size);
  }

  function tru() {
    let newQuantity = quantity - 1;
    if (newQuantity <= 1) {
      newQuantity = 1;
      onUpdateQuantity(cartIndex, newQuantity, cartItem.color, cartItem.size);
    } else {
      onUpdateQuantity(cartIndex, newQuantity, cartItem.color, cartItem.size);
    }
  }


  return (
    <>
      <tbody>
        <tr>
          <td className="cart-thumbnail">
            <img
              style={{ cursor: 'pointer' }}
              src={cartItem.productImage} a
              lt=""
              onClick={() => history.push(`/product/${cartItem.productId}`)}
            />
          </td>
          <td
            className="product-name"
            style={{ width: 250, cursor: 'pointer' }}
            onClick={() => history.push(`/product/${cartItem.productId}`)}
          >
            <div>{cartItem.productName}</div>
            {cartItem.color.colorName && <div>Màu: {cartItem.color.colorName}</div>}
            {cartItem.size.sizeName && <div>Kích thước: {cartItem.size.sizeName}</div>}
          </td>
          <td className="product-price">
            <div>{productPrice.toLocaleString() + " vnđ"}</div>
          </td>
          <td className="product-quantity">
            <div className="plus-cart-minus">
              <button className="minus-btn"
                onClick=
                {() => {
                  quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1)
                  tru()
                }}
              >-</button>

              <input type="text" name="" className="plus-minus-cart-box" disabled

                value=
                {
                  quantity < 1 ? 1 : quantity
                }


              />
              <button className="plus-btn" onClick={() => {
                setQuantity(quantity + 1)
                cong()
              }}
              >+</button>
            </div>
          </td>
          <td className="total-price">
            <div> {(productPrice * quantity).toLocaleString()} vnđ</div>
          </td>

          <td className="product-remove">
            <button className="delete-product">
              <span
                onClick={() => onDeleteCart(cartIndex)}
              >X</span>
            </button>
          </td>
        </tr>
      </tbody>


    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCart: (params) => dispatch(editCartTaskAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(Item);