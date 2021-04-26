import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCartSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/cart',
      params: {
        _page: page,
        _limit: limit,
      }
    });
    yield put({
      type: "GET_CART_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CART_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addCartTaskSaga(action) {
  try {
    const { id, name, price } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/cart',
      data: {
        _id: id,
        _name: name,
        _price: price
      }
    });
    yield put({
      type: "ADD_CART_TASK_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_CART_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteCartTaskSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/cart/${id}`,
    });
    console.log("SUCCESS")
    yield put({
      type: "DELETE_CART_TASK_SUCCESS",
      payload: {
          data: result.data
        },
      });
    } catch (e) {
    console.log("FAIL")
    yield put({
      type: "DELETE_CART_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery('GET_CART_REQUEST', getCartSaga);
  yield takeEvery('ADD_CART_TASK_REQUEST', addCartTaskSaga);
  yield takeEvery('DELETE_CART_TASK_REQUEST', deleteCartTaskSaga);
}
