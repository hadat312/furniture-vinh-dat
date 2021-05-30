import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import categoriesSaga from './categories.saga';
import productSaga from './product.saga';
import wishlistSaga from './wishlist.saga';
import cartSaga from './cart.saga';
import billSaga from './bill.saga';
import orderSaga from './order.saga';
import checkoutSaga from './checkout.saga'

import addressSaga from './address.saga'

import commentSaga from './comment.saga'


// Admin Area

import adminProductSaga from './AdminPro/product.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(categoriesSaga);
  yield fork(productSaga);
  yield fork(wishlistSaga);
  yield fork(cartSaga);
  yield fork(billSaga);
  yield fork(orderSaga);
  yield fork(checkoutSaga);

  yield fork(addressSaga);
  yield fork(commentSaga);


  // Admin Area
  yield fork(adminProductSaga);
}
