import React, { useEffect } from 'react';
import Item from './components/Item';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartAction,
  deleteCartTaskAction
} from '../../redux/actions';
function CardPage(props) {

  const { getProductList, productList, getCart, cart, deleteCart } = props;

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

  const UserInfoLocalStorage = JSON.parse(localStorage.getItem("userId"))||{};

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
              && cartItem.userId === UserInfoLocalStorage.userId) {
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
      <div>CART</div>
      {renderCart()}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);