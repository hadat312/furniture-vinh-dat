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
    const { id, image, name, size, color, quantity, price, userId } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/cart',
      data: {
        _id: id,
        image: image,
        name: name,
        size: size,
        color: color,
        quantity: quantity,
        price: price,
        userId: userId,
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

function* editCartTaskSaga(action) {
  try {
    const { id, color, size, quantity, price, image } = action.payload;
    const resutl = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/cart/${id}`,
      data: {
        color: color,
        size: size,
        quantity: quantity,
        price: price,
        image: image,
      }
    });
    yield put({
      type: "EDIT_CART_TASK_SUCCESS",
      payload: {
        id: id,
        data: resutl.data
      }
    });
  } catch (e) {
    yield put({
      type: "EDIT_CART_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteCartTaskSaga(action) {
  try {
    const { id } = action.payload;
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/cart/${id}`,
    });
    yield put({
      type: "DELETE_CART_TASK_SUCCESS",
      payload: id
    });
  } catch (e) {
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
  yield takeEvery('EDIT_CART_TASK_REQUEST', editCartTaskSaga);
}
