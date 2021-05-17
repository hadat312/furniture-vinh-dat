import { Button } from 'antd';
import React, { useEffect } from 'react';
import Item from './components/Item'
import { connect } from 'react-redux';
import {
  getProductListAction,
  getWishListAction,
  deleteWishlistTaskAction,
} from '../../redux/actions';
import './wishlist.css';
function WishlistPage({
  getProductList,
  productList,
  wishlist,
  getWishlist,
  deleteWishlist,
  addWishList,
}) {

  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  function onDeleteWishlist(id) {
    wishlist.data.map((item) => {
      if (id === item._id) {
        return deleteWishlist({ id: item.id });
      }
    })
  }



  function renderWishlist() {
    if (wishlist.load) return <p>Loading...</p>;
    return (
      wishlist.data.map((wishlistItem, wishlistIndex) => {
        return (
          <>
            <Item
              key={wishlistItem.productId}
              wishlistIndex={wishlistIndex}
              productItem={wishlistItem}
              wishlistItem={wishlistItem}
              onDeleteWishlist={onDeleteWishlist}
            />
            <hr />
          </>
        );
      })
    );
  }
  return (
    <>
      <table className="cart-table container">
        <thead>
          <tr>
            <th className="product-name" colSpan="2">Product</th>
            <th className="product-price" colSpan="3"> Price</th>
          </tr>
        </thead>
        {renderWishlist()}
      </table>
    </>
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  return {
    wishlist: wishlist,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishList: (params) => dispatch(getWishListAction(params)),
    deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);