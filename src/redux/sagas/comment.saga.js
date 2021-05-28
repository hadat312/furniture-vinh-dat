import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCommentSaga(action) {
  try {
    // const { productId } = action.payload;
    const { productId } = action.payload
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/comment`,
      params: {
        productId: productId
      }
    });
    yield put({
      type: 'GET_COMMENT_SUCCESS',
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: 'GET_COMMENT_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}


function* addCommentSaga(action) {
  try {
    const { productId, comment, userName, userId, rate, date, time } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/comment',
      data: {
        userName: userName,
        userId: userId,
        productId: productId,
        comment: comment,
        rate: rate,
        date: date,
        time: time
      }
    });
    yield put({
      type: 'ADD_COMMENT_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: 'ADD_COMMENT_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}


export default function* commentSaga() {
  yield takeEvery('GET_COMMENT_REQUEST', getCommentSaga);
  yield takeEvery('ADD_COMMENT_REQUEST', addCommentSaga);
}