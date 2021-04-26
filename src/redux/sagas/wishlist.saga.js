import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getWishlistSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/wishlist',
      params: {
        _page: page,
        _limit: limit,
      }
    });
    yield put({
      type: "GET_WISH_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_WISH_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addWishlistTaskSaga(action) {
  try {
    const { id, } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/wishlist',
      data: {
        _id: id,
      }
    });
    yield put({
      type: "ADD_WISH_LIST_TASK_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_WISH_LIST_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteWishlistTaskSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/wishlist/${id}`,
    });
    console.log("SUCCESS")
    yield put({
      type: "DELETE_WISH_LIST_TASK_SUCCESS",
      payload: {
          data: result.data
        },
      });
    } catch (e) {
    console.log("FAIL")
    yield put({
      type: "DELETE_WISH_LIST_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* wishlistSaga() {
  yield takeEvery('GET_WISH_LIST_REQUEST', getWishlistSaga);
  yield takeEvery('ADD_WISH_LIST_TASK_REQUEST', addWishlistTaskSaga);
  yield takeEvery('DELETE_WISH_LIST_TASK_REQUEST', deleteWishlistTaskSaga);
}
