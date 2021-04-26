import { Button } from 'antd';
import React from 'react';

function Item(props) {
  const {productId, name, price, onDeleteWishlist} = props;
  return (
    <>
      <div>ID: {productId}</div>
      <div>Name: {name}</div>
      <div>Price: {price.toLocaleString()} vnđ</div>
      <div><Button onClick={() => onDeleteWishlist(productId)}>Delete</Button></div>
    </>
  );
}

export default Item;