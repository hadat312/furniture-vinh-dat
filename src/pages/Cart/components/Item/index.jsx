import { Button } from 'antd';
import React from 'react';

function Item(props) {
  const {
    productItem,
    onDeleteCart,
    cartItem
  } = props;
  return (
    <>
      <div>Mã sản phẩm: {cartItem._id}</div>
      <div>Tên: {productItem.productName}</div>
      {cartItem.color

        ? <div>Màu: {cartItem.color}</div>
        : null
      }
      {cartItem.size

        ? <div>Kích thước: {cartItem.size}</div>
        : null
      }
      {cartItem.quantity

        ? <div>Số lương: {cartItem.quantity}</div>
        : null
      }
      {cartItem.price

        ? <div>Giá: {cartItem.price.toLocaleString()}</div>
        : <div>Giá: {(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
      }

      <div><Button danger onClick={() => onDeleteCart(cartItem._id)}>Delete</Button></div>
    </>
  );
}

export default Item;