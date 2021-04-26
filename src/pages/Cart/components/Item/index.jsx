import { Button } from 'antd';
import React from 'react';

function Item(props) {
  const {productId, name, price, discount} = props;
  console.log("🚀 ~ file: index.jsx ~ line 6 ~ Item ~ productId, name, price", productId, name, price)
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