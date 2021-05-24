import React, { useEffect, useState } from 'react';
import { notification, Table, Divider, Button } from 'antd';
import Item from './components/Item';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartListAction,
  deleteCartTaskAction,
  editCartTaskAction,

} from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';

import './cart.css';
function CardPage({
  productList,
  getCartList,
  cartList,
  deleteCart,
  editCart
}) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // const [selectionType, setSelectionType] = useState('checkbox');

  const key = `open${Date.now()}`;

  // const columns = [
  //   {
  //     title: 'Product',
  //     dataIndex: 'productImage',
  //     // render: (text) => <a> <img src={`${text}`} /></a>,
  //   },
  //   {
  //     dataIndex: 'productName',
  //     render: (text) => 
  //       <div>{text}</div>
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'productPrice',
  //   },
  //   {
  //     title: 'Quantity',
  //     dataIndex: 'productQuantity',
  //   },
  //   {
  //     title: 'Total',
  //     // dataIndex: 'productQuantity',
  //   }
  // ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === 'Disabled User',
  //     // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  function onAddCheckOut() {
    if (!userInfo) {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thực hiện thao tác này',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            Đăng nhập ngay
          </Button>
        ),
      });
    } else {
      history.push(ROUTERS.CHECKOUT)
    }
  }

  function onDeleteCart(cartIndex) {
    const newCart = cartList.data;
    newCart.splice(cartIndex, 1)
    deleteCart({
      userId: userInfo.id,
      carts: [
        ...newCart,
      ]
    })
    notification.success({
      message: 'xóa sản phẩm thành công',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function onUpdateQuantity(cartIndex, value, colorSelected, sizeSelected) {


    if (!colorSelected.id && !sizeSelected.id) { //ko có size và color
      const newCart = cartList.data;
      newCart.splice(cartIndex, 1, {
        id: cartList.data[cartIndex].id,
        productId: cartList.data[cartIndex].productId,
        productQuantity: value,
        productName: cartList.data[cartIndex].productName,
        productImage: cartList.data[cartIndex].productImage,
        productPrice: cartList.data[cartIndex].productPrice,
        productDiscount: cartList.data[cartIndex].productDiscount,
        color: {},
        size: {}
      })
      editCart({
        userId: userInfo.id,
        carts: newCart,
      })
    }
    else if (!colorSelected.id) { // nếu chỉ có size
      const newCartList = cartList.data;
      newCartList.splice(cartIndex, 1, {
        id: cartList.data[cartIndex].id,
        productId: cartList.data[cartIndex].productId,
        productQuantity: value,
        productName: cartList.data[cartIndex].productName,
        productImage: cartList.data[cartIndex].productImage,
        productPrice: cartList.data[cartIndex].productPrice,
        productDiscount: cartList.data[cartIndex].productDiscount,
        color: {},
        size: {
          id: sizeSelected.id,
          sizeName: sizeSelected.sizeName,
          price: sizeSelected.price
        }
      })
      editCart({
        userId: userInfo.id,
        carts: newCartList,
      })
      // }
    }
    else if (!sizeSelected.id) { // nếu chỉ có color
      const newCartList = cartList.data;
      newCartList.splice(cartIndex, 1, {
        id: cartList.data[cartIndex].id,
        productId: cartList.data[cartIndex].productId,
        productQuantity: value,
        productName: cartList.data[cartIndex].productName,
        productImage: cartList.data[cartIndex].productImage,
        productPrice: cartList.data[cartIndex].productPrice,
        productDiscount: cartList.data[cartIndex].productDiscount,
        color: {
          id: colorSelected.id,
          colorName: colorSelected.colorName,
          price: colorSelected.price
        },
        size: {}
      })
      editCart({
        userId: userInfo.id,
        carts: newCartList,
      })
    }
    else {//có cả color và size
      const newCartList = cartList.data;
      newCartList.splice(cartIndex, 1, {
        id: cartList.data[cartIndex].id,
        productId: cartList.data[cartIndex].productId,
        productQuantity: value,
        productName: cartList.data[cartIndex].productName,
        productImage: cartList.data[cartIndex].productImage,
        productPrice: cartList.data[cartIndex].productPrice,
        productDiscount: cartList.data[cartIndex].productDiscount,
        color: {
          id: colorSelected.id,
          colorName: colorSelected.colorName,
          price: colorSelected.price
        },
        size: {
          id: sizeSelected.id,
          sizeName: sizeSelected.sizeName,
          price: sizeSelected.price
        }
      })
      editCart({
        userId: userInfo.id,
        carts: newCartList,
      })
    }
  }
  function renderCart() {
    if (cartList.load) return <p>Loading...</p>;
    return (
      cartList.data.map((cartItem, cartIndex) => {
        return (
          <>
            <Item
              key={cartItem.productId}
              cartItem={cartItem}
              cartIndex={cartIndex}
              onDeleteCart={onDeleteCart}
              onUpdateQuantity={onUpdateQuantity}

            // image={cartItem.image}
            // priceInProductDetail={cartItem.price}
            // quantity={cartItem.quantity}
            // color={cartItem.color}
            />
            {/* <hr /> */}
          </>
        );
      })
    );
  }
  return (
    <>
      {/* <div className="cart-table-container container">
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={cartList.data}
          pagination={{ defaultCurrent: 1 }}
        />
      </div> */}
      <table className="cart-table-container container">
        <thead>
          <tr>
            <th className="cart-name" colSpan="2">Product</th>
            <th className="cart-price"> Price</th>
            <th className="cart-quantity" >Quantity</th>
            <th className="cart-subtotal" colSpan="2" >Total</th>
          </tr>
        </thead>
        {renderCart()}
      </table>

      <div className="cart-coupon_area container">
        <div className="cart-content">
          <div className="cart-coupon_code">
            <button className="btn-clear">CART CLEAR</button>
            <button className="btn-checkout"
              onClick={onAddCheckOut}
            >View Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList: cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartList: (params) => dispatch(getCartListAction(params)),
    deleteCart: (params) => dispatch(deleteCartTaskAction(params)),
    editCart: (params) => dispatch(editCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);