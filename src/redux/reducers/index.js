import { combineReducers } from 'redux';

import productReducer from './product.reducer';
import categoriesReducer from './categories.reducer';
import wishlistReducer from './wishlist.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import billReducer from './bill.reducer';
import orderReducer from './order.reducer';
import checkoutReducer from './checkout.reducer';

import addressReducer from './address.reducer'
import commentReducer from './comment.reducer'

import searchResultsReducer from './searchResult.reducer'

// User 
import commonAddressReducer from './User/common.reducer'

// Amin Area
import adminCommonReducer from './AdminPro/common.reducer'
import adminProductReducer from './AdminPro/product.reducer'


import adminVoucherReducer from './AdminVoucher/voucher.reducer';

export default combineReducers({
  productReducer: productReducer,
  userReducer: userReducer,
  categoriesReducer: categoriesReducer,
  wishlistReducer: wishlistReducer,
  cartReducer: cartReducer,
  billReducer: billReducer,
  orderReducer: orderReducer,
  checkoutReducer:checkoutReducer,

  addressReducer:addressReducer,
  commentReducer:commentReducer,

  searchResultsReducer: searchResultsReducer,
  // User
  commonAddressReducer:commonAddressReducer,

  // Amin Area
  adminCommonReducer:adminCommonReducer,
  adminProductReducer:adminProductReducer,

  adminVoucherReducer:adminVoucherReducer,
})

//data trả về ở reducer