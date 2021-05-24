import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getOrderListSaga(action) {
  try {
    const { userId, page, limit, searchKey, sort, order } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/orders`,
      params: {
        userId: userId,
        _page: page,
        _limit: limit,
        ...searchKey && { q: searchKey },
        _sort: sort,
        _order: order,
      }
    });
    yield put({
      type: "GET_ORDER_LIST_SUCCESS",
      payload: {
        data: result.data,
        userId: userId,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ORDER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addOrderSaga(action) {
  try {
    const { userName, email, phone, address, totalPrice, date, time, userId, carts } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3002/orders`,
      data: {
        userName: userName,
        email: email,
        phone: phone,
        address: address,
        totalPrice: totalPrice,
        date,
        time,
        userId:userId,
        carts: carts,
      }
    });
    yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
        carts: [],
      }
    });
    yield put({
      type: "ADD_ORDER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_ORDER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

// function* editCartTaskSaga(action) {
//   try {
//     const { userId, carts } = action.payload;
//     const result = yield axios({
//       method: 'PATCH',
//       url: `http://localhost:3002/users/${userId}`,
//       data: {
//         carts: carts
//       }
//     });
//     yield put({
//       type: "EDIT_CART_TASK_SUCCESS",
//       payload: {
//         data: result.data.carts,
//       }
//     });
//   } catch (e) {
//     yield put({
//       type: "EDIT_CART_TASK_FAIL",
//       payload: {
//         error: e.error
//       },
//     });
//   }
// }

function* deleteOrderSaga(action) {
  try {
    const { id, userId } = action.payload;
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/orders/${id}`,
    });
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/orders`,
      params: {
        userId: userId,
      }
    });
    yield put({
      type: "GET_ORDER_LIST_SUCCESS",
      payload: {
        data: result.data,
        userId: userId,
      },
    });
    yield put({
      type: "DELETE_ORDER_SUCCESS",
      payload: {},
    });
  } catch (e) {
    yield put({
      type: "DELETE_ORDER_REQUEST",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery('GET_ORDER_LIST_REQUEST', getOrderListSaga);
  yield takeEvery('ADD_ORDER_REQUEST', addOrderSaga);
  yield takeEvery('DELETE_ORDER_REQUEST', deleteOrderSaga);
  // yield takeEvery('EDIT_CART_TASK_REQUEST', editCartTaskSaga);
}
