import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../../utils/history'
import { ROUTERS } from '../../../constants/router'


function* createCouponAdminSaga(action) {
  try {
    // const { productId, comment, userName, userId, rate, date, time } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/coupon',
      data: {

      }
    });
    yield put({
      type: 'ADMIN/CREATE_COUPON_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: 'CREATE_COUPON_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}


export default function* couponSaga() {

  yield takeEvery('ADMIN/CREATE_COUPON_REQUEST', createCouponAdminSaga);
}