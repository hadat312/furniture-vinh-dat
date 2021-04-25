import { Button } from 'antd';
import React, { useEffect } from 'react';
import Item from './components/Item'
import { connect } from 'react-redux';
import {
  getWishlistAction,
  deleteWishlistTaskAction
} from '../../redux/actions';
import './wishlist.css';
function WishlistPage(props) {
  const {
    wishlist,
    getWishlist,
    deleteWishlist,
  } = props;
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
          <>
            <Item
              key={wishlistItem._id}
              productId={wishlistItem._id}
              name={wishlistItem._name}
              price={wishlistItem._price}
              onDeleteWishlist={onDeleteWishlist}
            />
            <hr />
          </>
        );
      })
    );
  }
  return (
    renderWishlist()
  );
}

const mapStateToProps = (state) => {
  const { wishlist } = state.wishlistReducer;
  return {
    wishlist: wishlist
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: (params) => dispatch(getWishlistAction(params)),
    deleteWishlist: (params) => dispatch(deleteWishlistTaskAction(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);