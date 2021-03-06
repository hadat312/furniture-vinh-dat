import React, { useEffect, useState } from 'react';

import { notification, Table, Divider, Button, Select, Form, Input } from 'antd';
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

  const [voucherKey, setVoucherKey] = useState("");

  const [isVoucherName, setIsVoucherName] = useState("");

  const [isVoucherPrice, setIsVoucherPrice] = useState(0);

  useEffect(() => {
    getProductList({});
  }, [])

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
        message: 'Ch??a ????ng nh???p',
        description: 'B???n c???n ????ng nh???p ????? th??m v??o gi??? h??ng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            ????ng nh???p ngay
          </Button>
        ),
      });
    }
  }

  function onAddCheckOut() {
    if (!userInfo) {
      return notification.warning({
        message: 'Ch??a ????ng nh???p',
        description: 'B???n c???n ????ng nh???p ????? th???c hi??n',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push(ROUTERS.LOGIN);
            }}
          >
            ????ng nh???p ngay
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
      message: 'x??a s???n ph???m th??nh c??ng',
      key,
      placement: 'bottomRight',
      duration: 2
    });
  }

  function onUpdateQuantity(cartIndex, value, colorSelected, sizeSelected) {
    // console.log("???? ~ file: index.jsx ~ line 138 ~ onUpdateQuantity ~ cartIndex", cartIndex)

    if (!colorSelected.id && !sizeSelected.id) { //ko c?? size v?? color
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
      // console.log("???? ~ file: index.jsx ~ line 148 ~ onUpdateQuantity ~ cartIndex", cartIndex)
      editCart({
        userId: userInfo.id,
        carts: newCart,
      })
    }
    else if (!colorSelected.id) { // n???u ch??? c?? size
      // console.log("???? ~ file: index.jsx ~ line 154 ~ onUpdateQuantity ~ colorSelected", colorSelected)
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
    else if (!sizeSelected.id) { // n???u ch??? c?? color
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
    else {//c?? c??? color v?? size
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

  function onChangeVoucherSearch(e) {
    setVoucherKey(e);

  }

  function addToGetVoucher() {
    const voucherIndex = voucherList.data.findIndex((voucherItem) => {   //  T??m index return l???i voucherKey === voucherItem.voucherCode t???i index ???? 
      return voucherKey === voucherItem.voucherCode;      
    })

    if (voucherIndex !== -1) {
      setIsVoucherName(voucherList.data[voucherIndex].voucherName);
      setIsVoucherPrice(voucherList.data[voucherIndex].voucherPrice);
    } else {
      setIsVoucherName('');
      setIsVoucherPrice(0);
      notification.warning({
        message: 'M?? khuy???n m??i ???? h???t h???n s??? d???ng ho???c kh??ng ????ng',
        // description: 'B???n c???n ????ng nh???p ????? th??m v??o gi??? h??ng',
        key,
      });
    }
  }
  return (

    <>
      {
        cartList.data.length === 0
          ? (
            <div className="empty-cart-container">
              <AiOutlineShoppingCart className="empty-cart-container__cart-icon" />
              <div className="empty-cart-container__title">
                <p>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng</p>
              </div>
              <button className="btn-shopping" onClick={() => history.push(ROUTERS.HOME)}>
                Ti???p t???c mua s???m
              </button>
            </div>
          )
          : (
            <>
              <div className="cart-container">
                <table className="cart-container__cart-table-container">
                  <thead>
                    <tr>
                      <th className="cart-table-container__cart-name" colSpan="2">T??n s???n ph???m</th>
                      <th className="cart-table-container__cart-price">Gi?? ti???n</th>
                      <th className="cart-table-container__cart-quantity" >S??? l?????ng</th>
                      <th className="cart-table-container__cart-subtotal" colSpan="2" >T???ng c???ng</th>
                    </tr>
                  </thead>
                  {renderCart()}
                </table>

                <div className="cart-coupon_area container">
                  <div className="cart-voucher-space">
                    <div className="cart-voucher-left">

                    </div>

                    <div className="cart-voucher-right">
                      <p>T???m t??nh {onCountQuantity()} s???n ph???m</p>
                      {/* <Form
                      >
                        <Form.Item name="voucherId">
                          <Select
                            // defaultValue={voucherSelected}
                            placeholder="Ch???n ho???c nh???p m?? khuy???n m??i"
                            style={{ width: "300px" }}
                            onChange={onChangePrice}
                          >
                            {renderVoucherList()}
                          </Select>
                        </Form.Item>
                      </Form>  */}
                      <div className="cart-voucher-place">
                        <Input placeholder="Nh???p m?? khuy???n m??i" onChange={(e) => onChangeVoucherSearch(e.target.value)} />
                        <Button type="primary" onClick={addToGetVoucher}>Nh???n Code</Button>
                      </div>
                      {isVoucherName !== '' && <div className="cart-voucher_name">T??n M?? Khuy???n M??i: {isVoucherName}</div>}
                      {isVoucherPrice !== 0 && <div className="cart-discount">Gi???m Gi??:{parseInt(isVoucherPrice).toLocaleString() + "VND"}</div>}
                      <div className="cart-total">Th??nh Ti???n: {parseFloat(grandTotal - isVoucherPrice).toLocaleString() + "VND"} </div>
                    </div>
                  </div>

                  <div className="cart-content">
                    <div className="cart-coupon_code">
                      <button className="btn-clear" onClick={() => handleClearCartTask()}>X??A TO??N B???</button>
                      <button className="btn-checkout"
                        onClick={onAddCheckOut}
                      >THANH TO??N</button>
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