import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/products',
      params: {
        _page: page,
        _limit: limit,
        // page, limit lay tu component
      }
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    //  const user = yield call(Api.fetchUser, action.payload.userId);
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/products/:id',
      params: {
      }
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: { data: result.data }
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_DETAIL_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  // yield takeEvery('ADD_TASK_REQUEST', addTaskSaga);
  // yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
}
