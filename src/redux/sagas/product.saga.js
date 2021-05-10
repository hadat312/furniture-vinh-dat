import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const { page, limit, itemCategoryId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/products',
      params: {
        _page: page,
        _limit: limit,
        ...itemCategoryId && { itemCategoryId },
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

function* getSortProductListSaga(action) {
  try {
    const { itemCategoryId, sort, order } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/products',
      params: {
        // _page: page,
        // _limit: limit,
        ...itemCategoryId && { itemCategoryId },
        _sort: sort,
        _order: order,
      }
    });
    yield put({
      type: "GET_SORT_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_SORT_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* searchProductSaga(action) {
  try {
    const { text } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/products`,
      params: {
        q: text,
      }
    });
    yield put({
      type: "SEARCH_PRODUCT_SUCCESS",
      payload: {
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "SEARCH_PRODUCT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/products/${id}?_embed=colors`,
      params: {
        _embed: 'sizes',
        _expand: 'itemCategory',
      }
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: {
        data: result.data
      }
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
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
  yield takeEvery('GET_SORT_PRODUCT_LIST_REQUEST', getSortProductListSaga);
  yield takeEvery('SEARCH_PRODUCT_REQUEST', searchProductSaga);
}
