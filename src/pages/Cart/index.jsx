import React, { useEffect, useState } from 'react';

import { notification, Table, Divider, Button, Select, Form } from 'antd';
import Item from './components/Item';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartListAction,
  deleteCartTaskAction,
  editCartTaskAction,
  clearCartTaskAction,
  getVoucherAdminAction,
} from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';

import cart from '../../images/cart.svg';
import { AiOutlineShoppingCart } from "react-icons/ai";
import './cart.css';
function CardPage({
  productList,
  getCartList,
  cartList,
  deleteCart,
  editCart,
  clearCart,
  voucherList,
  getVoucher,
  getProductList,

}) {

  // useEffect(() => {
  //   getProductList({});
  // }, [])

  useEffect(() => {
    getVoucher();
    getProductList({});
  }, [])

  // useEffect(() => {
  //   if (voucherList.data.id) {
  //     setVoucherSelected(voucherList.data[0] || {})
  //   }
  // }, [voucherList.data])



  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // const [selectionType, setSelectionType] = useState('checkbox');

  // const [voucherSelected, setVoucherSelected] = useState({});

  // console.log('voucherSelected: ', voucherList.data[0].voucherName || {})
  const [voucherSelected, setVoucherSelected] = useState(0);
  // console.log("🚀 ~ file: index.jsx ~ line 53 ~ voucherSelected", voucherSelected)

  const key = `open${Date.now()}`;

  // console.log('voucherSelected: ', voucherList.data[0].voucherName || {})
  function renderVoucherList() {
    if (voucherList.load) return <p>Loading...</p>
    return voucherList.data.map((voucherListItem, voucherListIndex) => {
      return (
        <Select.Option key={voucherListIndex} value={voucherListItem.id} >
          {voucherListItem.voucherName}
        </Select.Option>
      )
    })
  }


  function handleClearCartTask() {
    if (userInfo) {
      clearCart({ userId: userInfo.id })
    } else {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
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
    }
  }

  function onAddCheckOut() {
    if (!userInfo) {
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thực hiên',
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
        productId: cartList.data[cartIndex].productId,
        productQuantity: value,
        productName: cartList.data[cartIndex].productName,
        productImage: cartList.data[cartIndex].productImage,
        productPrice: cartList.data[cartIndex].productPrice,
        productDiscount: cartList.data[cartIndex].productDiscount,
        color: {},
        size: {}
      })
      // console.log("🚀 ~ file: index.jsx ~ line 148 ~ onUpdateQuantity ~ cartIndex", cartIndex)
      editCart({
        userId: userInfo.id,
        carts: newCart,
      })
    }
    else if (!colorSelected.id) { // nếu chỉ có size
      // console.log("🚀 ~ file: index.jsx ~ line 154 ~ onUpdateQuantity ~ colorSelected", colorSelected)
      const newCartList = cartList.data;
      newCartList.splice(cartIndex, 1, {
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

  let grandTotal = 0;

  let grandCount = 0;

  function renderCart() {
    if (cartList.load) return <p>Loading...</p>;
    return (
      cartList.data.map((cartItem, cartIndex) => {

        const productPrice = ((cartItem.productPrice + (cartItem.color.price || 0)
          + (cartItem.size.price || 0)) * (1 - cartItem.productDiscount)) * cartItem.productQuantity;
        grandTotal = (grandTotal + productPrice);
        grandCount = grandCount + cartItem.productQuantity;

        return productList.data.map((productListItem, productListIndex) => {
          if (productListItem.id === cartItem.productId) {
            return (
              <>
                <Item
                  key={cartItem.productId}
                  cartItem={cartItem}
                  cartIndex={cartIndex}
                  onDeleteCart={onDeleteCart}
                  onUpdateQuantity={onUpdateQuantity}
                  productListCategoryId={productListItem.categoryId}
                // image={cartItem.image}
                // priceInProductDetail={cartItem.price}
                // quantity={cartItem.quantity}
                // color={cartItem.color}
                />
                {/* <hr /> */}
              </>
            );
          }
        })
      })
    );
  }

  let countQuantity = 0;
  function onCountQuantity() {
    cartList.data.forEach((cartItem, cartIndex) => {
      countQuantity += cartItem.productQuantity
      console.log(countQuantity)
    })
    return countQuantity;
  }


  function onChangePrice(values) {
    return voucherList.data.map((voucherItem, voucherIndex) => {
      if (values === voucherItem.id) {
        return (
          setVoucherSelected(voucherItem.voucherPrice)
        )
      }
    })
  }

  return (
    <>
      {
        cartList.data.length === 0
          ? (
            <div className="empty-cart-container">
              <AiOutlineShoppingCart className="empty-cart-container__cart-icon" />
              <div className="empty-cart-container__title">
                <p>Không có sản phẩm nào trong giỏ hàng</p>
              </div>
              <button className="btn-shopping" onClick={() => history.push(ROUTERS.HOME)}>
                Tiếp tục mua sắm
              </button>
            </div>
          )
          : (
            <>
              <div className="cart-container">
                <table className="cart-container__cart-table-container">
                  <thead>
                    <tr>
                      <th className="cart-table-container__cart-name" colSpan="2">Tên sản phẩm</th>
                      <th className="cart-table-container__cart-price">Giá tiền</th>
                      <th className="cart-table-container__cart-quantity" >Số lượng</th>
                      <th className="cart-table-container__cart-subtotal" colSpan="2" >Tổng cộng</th>
                    </tr>
                  </thead>
                  {renderCart()}
                </table>

                <div className="cart-coupon_area container">
                  <div className="cart-voucher-space">
                    <div className="cart-voucher-left">

                    </div>

                    <div className="cart-voucher-right">
                    <p>Tạm tính {onCountQuantity()} sản phẩm</p>
                      <Form
                      >
                        <Form.Item name="voucherId">
                          <Select
                            // defaultValue={voucherSelected}
                            placeholder="Chọn hoặc nhập mã khuyến mãi"
                            style={{ width: "300px" }}
                            onChange={onChangePrice}
                          >
                            {renderVoucherList()}
                          </Select>
                        </Form.Item>
                      </Form>
                      {/* <h6>Giảm Giá:{voucherList.data.voucherPrice} </h6>
                <h6>Thành Tiền: </h6> */}
                      <div className="cart-discount">Giảm Giá:{parseInt(voucherSelected).toLocaleString() + "VND"}</div>
                      <div className="cart-total">Thành Tiền: {parseFloat(grandTotal - voucherSelected).toLocaleString() + "VND"} </div>
                    </div>
                  </div>

                  <div className="cart-content">
                    <div className="cart-coupon_code">
                      <button className="btn-clear" onClick={() => handleClearCartTask()}>XÓA TOÀN BỘ</button>
                      <button className="btn-checkout"
                        onClick={onAddCheckOut}
                      >XÁC NHẬN GIỎ HÀNG</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      }
    </>
  );
}
const mapStateToProps = (state) => {
  const { productList } = state.productReducer
  const { cartList } = state.cartReducer;
  const { voucherList } = state.adminVoucherReducer
  return {
    cartList: cartList,
    voucherList: voucherList,
    productList: productList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartList: (params) => dispatch(getCartListAction(params)),
    deleteCart: (params) => dispatch(deleteCartTaskAction(params)),
    editCart: (params) => dispatch(editCartTaskAction(params)),
    clearCart: (params) => dispatch(clearCartTaskAction(params)),

    getVoucher: (params) => dispatch(getVoucherAdminAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);