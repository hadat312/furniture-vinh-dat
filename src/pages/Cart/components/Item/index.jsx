import { Button } from 'antd';
import React, { useState } from 'react';
import history from '../../../../utils/history';

function Item(props) {
  const {
    productItem,
    onDeleteCart,
    cartItem
  } = props;



  const styleSpan = {
    display: "inline-block",
    cursor: "pointer",
    color: "red"
  }
  return (
    <>
      <div>Mã sản phẩm: {cartItem._id}</div>
      <div>Ảnh: {cartItem.image}</div>
      <div>Tên: {productItem.productName}</div>
      {cartItem.color

        ? <div>Màu: {cartItem.color}</div>
        : null
      }
      {cartItem.size

        ? <div>Kích thước: {cartItem.size}</div>
        : <div style={{ fontWeight: "bold" }}>Nhấn <span style={styleSpan} onClick={() => { history.push(`/product/${cartItem._id}`) }}>vào đây</span> để cập nhật thông tin</div>
      }
      <div>Số lương: {cartItem.quantity}</div>
      {cartItem.price

        ? <div>Giá: {cartItem.price.toLocaleString()}</div>
        : <div>Giá: {(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
      }

      <div><Button danger onClick={() => onDeleteCart(cartItem._id)}>Delete</Button></div>
    </>
  );
}

export default Item;