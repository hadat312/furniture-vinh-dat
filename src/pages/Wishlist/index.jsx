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
  } = props;

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
    deleteWishlist({ _id: id });
  }



  function renderWishlist() {
    if (wishlist.load) return <p>Loading...</p>;
    return (
      wishlist.data.map((wishlistItem, wishlistIndex) => {
        return (
          productList.data.map((productListItem, productListIndex) => {
            if (wishlistItem._id === productListItem.id) {
              console.log("productListItem.productDiscount: ", productListItem.productDiscount)
              return (
                <>
                  <Item
                    key={wishlistItem._id}
                    productId={wishlistItem._id}
                    name={productListItem.productName}
                    price={productListItem.productPrice}
                    discount={productListItem.productDiscount}
                  // onDeleteWishlist={onDeleteWishlist}
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
      <div>WISHLIST</div>
      {renderWishlist()}
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