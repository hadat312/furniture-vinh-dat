import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getAddressSaga(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/users`,
      params: {
        id: userId,
        _page: page,
        _limit: limit,
      }
    });
    if (result.data.length === 0) {
      const newResult = yield axios({
        method: 'POST',
        url: 'http://localhost:3002/users',
        data: {
          userId,
          address: [],
        }
      });
      yield put({
        type: "GET_CART_LIST_SUCCESS",
        payload: {
          data: newResult.data.cart,
          // orderId: newResult.data.id
        },
      });
    } else {
      yield put({
        type: "GET_CART_LIST_SUCCESS",
        payload: {
          // get theo id(duy nhất) sẽ trả về 1 giá trị duy nhất => index = 0
          data: result.data[0].carts,
          // orderId: result.data[0].id
        },
      });
    }
  } catch (e) {
    yield put({
      type: "GET_CART_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getCitySaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/city',
    });
    yield put({
      type: "GET_CITY_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CITY_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getDistrictSaga(action) {
  try {
    const { parentcode } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/district',
      params: {
        ...parentcode && { parentcode },
      }
    });
    yield put({
      type: "GET_DISTRICT_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_DISTRICT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getWardSaga(action) {
  try {
    const { parentcode } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/ward',
      params: {
        ...parentcode && { parentcode },
      }
    });
    yield put({
      type: "GET_WARD_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_WARD_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addAddressSaga(action) {
  try {
    const { userId, address } = action.payload;
    // console.log("🚀 ~ file: address.saga.js ~ line 81 ~ function*addAddressSaga ~ action.payload", action.payload)
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data:{
        address: address,
      }
    });
    console.log("🚀 ~ file: address.saga.js ~ line 88 ~ function*addAddressSaga ~ result", result.data)
    yield put({
      type: "ADD_ADDRESS_SUCCESS",
      payload: {
        data: result.data.address,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_ADDRESS_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* addressSaga() {
  yield takeEvery('GET_ADDRESS_REQUEST', getAddressSaga)
  yield takeEvery('GET_CITY_REQUEST', getCitySaga);
  yield takeEvery('GET_DISTRICT_REQUEST', getDistrictSaga);
  yield takeEvery('GET_WARD_REQUEST', getWardSaga);
  yield takeEvery('ADD_ADDRESS_REQUEST', addAddressSaga);
}
