import { Button } from 'antd';
import React from 'react';

function Item(props) {
  const {productItem, wishlistItem, onDeleteWishlist} = props;
  
  return (
    <>
      {/* <div>ID: {productId}</div>
      <div>Name: {name}</div>
      <div>Price: {(price * (1 - discount)).toLocaleString()} vnđ</div> */}
      <div>Mã sản phẩm: {wishlistItem._id}</div>
      <div>Tên: {productItem.productName}</div>
      {wishlistItem.color

        ? <div>Màu: {wishlistItem.color}</div>
        : null
      }
      {wishlistItem.size

        ? <div>Kích thước: {wishlistItem.size}</div>
        : null
      }
      {wishlistItem.quantity

        ? <div>Số lương: {wishlistItem.quantity}</div>
        : null
      }
      {wishlistItem.price

        ? <div>Giá: {wishlistItem.price.toLocaleString()}</div>
        : <div>Giá: {(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
      }
      <div><Button danger onClick={()=>onDeleteWishlist(wishlistItem._id)}>Delete</Button></div>
    </>
  );
}

export default Item;