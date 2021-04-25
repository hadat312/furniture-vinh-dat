import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import categoriesSaga from './categories.saga';
import productSaga from './product.saga';
import wishlistSaga from './wishlist.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(categoriesSaga);
  yield fork(productSaga);
  yield fork(wishlistSaga);
}
