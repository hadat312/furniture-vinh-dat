import { Button } from 'antd';
import React from 'react';

function Item(props) {
  const {productId, name, price, discount, onDeleteCart} = props;
  return (
    <>
      <div>ID: {productId}</div>
      <div>Name: {name}</div>
      <div>Price: {(price * (1 - discount)).toLocaleString()} vnđ</div>
      <div><Button >Delete</Button></div>
    </>
  );
}

export default Item;