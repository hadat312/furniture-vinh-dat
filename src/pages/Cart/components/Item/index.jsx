import { Button } from 'antd';
import React, { useState } from 'react';
import history from '../../../../utils/history';
import { connect } from 'react-redux';

import { editCartTaskAction } from '../../../../redux/actions';


import './styles.css';

function Item(props) {

  const {
    productItem,
    onDeleteCart,
    cartItem,
    editCart
  } = props;

  const [count, setCount] = useState(cartItem.quantity);
  console.log("🚀 ~ file: index.jsx ~ line 21 ~ Item ~ count", count)

  const objCart = {
    quantity: cartItem.quantity
  }

  function editCartTask() {
    editCart({ id: cartItem.id, ...objCart })
  }


  const styleSpan = {
    display: "inline-block",
    cursor: "pointer",
    color: "red"
  }
  return (
    <>
      {/* <div>Mã sản phẩm: {cartItem._id}</div>
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

      <div><Button danger onClick={() => onDeleteCart(cartItem._id)}>Delete</Button></div> */}
      <tbody>
        <tr>
          <td className="cart-thumbnail">
            <img src={cartItem.image} alt="" />
            {/* {console.log("🚀 ~ file: index.jsx ~ line 22 ~ Item ~ productItem.image", productItem.image)} */}
          </td>
          <td className="product-name">
            {productItem.productName}
            {cartItem.color

              ? <div>Màu: {cartItem.color}</div>
              : null
            }
            {cartItem.size

              ? <div>Kích thước: {cartItem.size}</div>
              : <div style={{ fontWeight: "bold" }}>Nhấn <span style={styleSpan} onClick={() => { history.push(`/product/${cartItem._id}`) }}>vào đây</span> để cập nhật thông tin</div>
            }
          </td>
          <td className="product-price">
            {cartItem.price
              ? <div> {cartItem.price.toLocaleString()} vnđ</div>
              : <div>{(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
            }

          </td>
          <td className="product-quantity">
            <div className="plus-cart-minus">
              <button className="minus-btn"
                onClick=
                {() =>
                  count <= 1 ? setCount(1) : setCount(count - 1)
                }>-
                </button>

              <input type="text" name="" className="plus-minus-cart-box" disabled

                value=
                {
                  count < 1 ? 1 : count
                }


              />
              <button className="plus-btn" onClick={() => setCount(count + 1) }>+</button>
            </div>
          </td>
          <td className="total-price">
           <div> {(cartItem.price * count).toLocaleString()} vnđ</div>
           {console.log("aaaaaa: ",count)}
            {/* {cartItem.price
              ? <div> {cartItem.price.toLocaleString()}</div>
              : <div> {(productItem.productPrice * (1 - productItem.productDiscount)).toLocaleString()} vnđ</div>
            } */}
          </td>

          <td className="product-remove">
            <button className="delete-product">
              <span onClick={() => onDeleteCart(cartItem._id)}>X</span>
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