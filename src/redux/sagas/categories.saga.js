import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCategoriesSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/categories',
    });
    yield put({
      type: "GET_CATEGORIES_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORIES_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getSubCategoriesSaga(action) {
  try {
    const { categoryId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/subCategories',
      params: {
        ...categoryId && { categoryId },
      }
    });
    yield put({
      type: "GET_SUB_CATEGORIES_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_SUB_CATEGORIES_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getItemCategoriesSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/itemCategories',
    });
    yield put({
      type: "GET_ITEM_CATEGORIES_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ITEM_CATEGORIES_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* categoriesSaga() {
  yield takeEvery('GET_CATEGORIES_REQUEST', getCategoriesSaga);
  yield takeEvery('GET_SUB_CATEGORIES_REQUEST', getSubCategoriesSaga);
  yield takeEvery('GET_ITEM_CATEGORIES_REQUEST', getItemCategoriesSaga);
}
