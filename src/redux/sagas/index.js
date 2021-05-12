import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import categoriesSaga from './categories.saga';
import productSaga from './product.saga';
import wishlistSaga from './wishlist.saga';
import cartSaga from './cart.saga';
import billSaga from './bill.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(categoriesSaga);
  yield fork(productSaga);
  yield fork(wishlistSaga);
  yield fork(cartSaga);
  yield fork(billSaga);
}
