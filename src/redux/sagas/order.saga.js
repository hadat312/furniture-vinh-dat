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
    const { firstName, lastName, email, phone, address, totalPrice, userId, carts } = action.payload;
    console.log("🚀 ~ file: order.saga.js ~ line 38 ~ function*addOrderSaga ~ action.payload", action.payload)
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3002/orders`,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        totalPrice: totalPrice,
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

// function* deleteCartTaskSaga(action) {
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
//       type: "DELETE_CART_TASK_SUCCESS",
//       payload: {
//         data: result.data.carts,
//       }
//     });
//   } catch (e) {
//     yield put({
//       type: "DELETE_CART_TASK_FAIL",
//       payload: {
//         error: e.error
//       },
//     });
//   }
// }

export default function* orderSaga() {
  yield takeEvery('GET_ORDER_LIST_REQUEST', getOrderListSaga);
  yield takeEvery('ADD_ORDER_REQUEST', addOrderSaga);
  // yield takeEvery('DELETE_CART_TASK_REQUEST', deleteCartTaskSaga);
  // yield takeEvery('EDIT_CART_TASK_REQUEST', editCartTaskSaga);
}
