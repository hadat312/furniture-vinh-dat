import React, { useEffect } from 'react';
import Item from './components/Item';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartAction,
  deleteCartTaskAction,
  
} from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';

import './cart.css';
function CardPage(props) {

  const { getProductList, productList, getCart, cart, deleteCart, editCart } = props;

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 20,
    });
    getCart({
      page: 1,
      limit: 20,
    });
  }, []);


  

  function onAddCheckOut() {
    history.push(ROUTERS.CHECKOUT)
  }

  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) || {};

  function onDeleteCart(id) {
    cart.data.map((item) => {
      if (id === item._id) {
        return deleteCart({ id: item.id });
      }
    })
  }

  function renderCart() {
    if (cart.load) return <p>Loading...</p>;
    return (
      cart.data.map((cartItem) => {
        return (
          productList.data.map((productListItem) => {
            if (cartItem._id === productListItem.id
              && cartItem.userId === userInfoLocalStorage.id) {
              return (
                <>
                  <Item
                    key={cartItem._id}
                    productItem={productListItem}
                    cartItem={cartItem}
                    onDeleteCart={onDeleteCart}
             
                  // image={cartItem.image}
                  // priceInProductDetail={cartItem.price}
                  // quantity={cartItem.quantity}
                  // color={cartItem.color}
                  />
                  <hr />
                </>
              );
            }
          })
        );
      })
    );
  }

  return (
    <>
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
            {/* <input type="text" name="Coupon" placeholder="Enter your coupon code" /> */}
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
  const { productList } = state.productReducer;
  const { cart } = state.cartReducer;
  return {
    productList: productList,
    cart: cart,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCart: (params) => dispatch(getCartAction(params)),
    deleteCart: (params) => dispatch(deleteCartTaskAction(params)),
    // editCart: (params) => dispatch(editCartTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);