import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const { more, page, limit, categoryId, itemCategoryId, searchKey, sort, order } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/products?_embed=colors',
      params: {
        ...page && { _page: page },
        ...limit && { _limit: limit },
        ...categoryId && { categoryId },
        ...itemCategoryId && { itemCategoryId },
        ...searchKey && { q: searchKey },
        _sort: sort,
        _order: order,
        _embed: "sizes",
      }
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        page,
        more,
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

export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
}
