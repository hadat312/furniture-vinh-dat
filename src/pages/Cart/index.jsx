import React, { useEffect } from 'react';
import Item from './components/Item';
import { connect } from 'react-redux';
import {
  getProductListAction,
  getCartAction,
} from '../../redux/actions';
function CardPage(props) {

  const { getProductList, productList, getCart, cart } = props;

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 20,
    });
  }, []);

  useEffect(() => {
    getCart({
      page: 1,
      limit: 20,
    });
  }, []);

  function renderCart() {
    if (cart.load) return <p>Loading...</p>;
    return (
      cart.data.map((cartItem, cartIndex) => {
        return (
          productList.data.map((productListItem, productListIndex) => {
            if (cartItem._id === productListItem.productId) {
              console.log("productListItem.productDiscount: ", productListItem.productDiscount)
              return (
                <>
                  <Item
                    key={cartItem._id}
                    productId={cartItem._id}
                    name={productListItem.productName}
                    price={productListItem.productPrice}
                    discount={productListItem.productDiscount}
                    // discount={productListItem.productDiscount}
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
    // deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);