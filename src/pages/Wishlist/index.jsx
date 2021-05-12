import { Button } from 'antd';
import React, { useEffect } from 'react';
import Item from './components/Item'
import { connect } from 'react-redux';
import {
  getProductListAction,
  getWishlistAction,
  deleteWishlistTaskAction,
} from '../../redux/actions';
import './wishlist.css';
function WishlistPage(props) {
  const {
    getProductList,
    productList,
    wishlist,
    getWishlist,
    deleteWishlist,
    addWishList,
  } = props;

  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo")) || {};

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 20,
    });
  }, []);

  useEffect(() => {
    getWishlist({
      page: 1,
      limit: 20,
    });
  }, []);

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
          productList.data.map((productListItem, productListIndex) => {
            if (wishlistItem._id === productListItem.id
              && wishlistItem.userId === userInfoLocalStorage.id
            ) {
              return (
                <>
                  <Item
                    key={wishlistItem._id}
                    productItem={productListItem}
                    wishlistItem={wishlistItem}
                    // productId={wishlistItem._id}
                    // name={productListItem.productName}
                    // price={productListItem.productPrice}
                    // discount={productListItem.productDiscount}
                    onDeleteWishlist={onDeleteWishlist}
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
  const { productList } = state.productReducer;
  const { wishlist } = state.wishlistReducer;
  return {
    productList: productList,
    wishlist: wishlist,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getWishlist: (params) => dispatch(getWishlistAction(params)),
    deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);