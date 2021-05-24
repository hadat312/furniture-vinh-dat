import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCartListSaga(action) {
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
    // if (result.data.length === 0) {
    //   const newResult = yield axios({
    //     method: 'POST',
    //     url: 'http://localhost:3002/users',
    //     data: {
    //       userId,
    //       carts: [],
    //     }
    //   });
    //   yield put({
    //     type: "GET_CART_LIST_SUCCESS",
    //     payload: {
    //       data: newResult.data.cart,
    //       // orderId: newResult.data.id
    //     },
    //   });
    // } else {
    yield put({
      type: "GET_CART_LIST_SUCCESS",
      payload: {
        // get theo id(duy nhất) sẽ trả về 1 giá trị duy nhất => index = 0
        data: result.data[0].carts,
        // orderId: result.data[0].id
      },
    });
    // }
  } catch (e) {
    yield put({
      type: "GET_CART_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addCartTaskSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
        carts: carts,
      }
    });
    yield put({
      type: "ADD_CART_TASK_SUCCESS",
      payload: {
        data: result.data.carts,
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
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
        carts: carts
      }
    });
    yield put({
      type: "EDIT_CART_TASK_SUCCESS",
      payload: {
        data: result.data.carts,
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

// function* editCartTaskSaga(action) {
//   try {
//     const { id, color, size, quantity, price, image } = action.payload;
//     const resutl = yield axios({
//       method: 'PATCH',
//       url: `http://localhost:3002/cart/${id}`,
//       data: {
//         color: color,
//         size: size,
//         quantity: quantity,
//         price: price,
//         image: image,
//       }
//     });
//     yield put({
//       type: "EDIT_CART_TASK_SUCCESS",
//       payload: {
//         id: id,
//         data: resutl.data
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

function* deleteCartTaskSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
        carts: carts
      }
    });
    yield put({
      type: "DELETE_CART_TASK_SUCCESS",
      payload: {
        data: result.data.carts,
      }
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

// function* deleteCartTaskSaga(action) {
//   try {
//     const { id } = action.payload;
//     yield axios({
//       method: 'DELETE',
//       url: `http://localhost:3002/cart/${id}`,
//     });
//     yield put({
//       type: "DELETE_CART_TASK_SUCCESS",
//       payload: id
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

export default function* cartSaga() {
  yield takeEvery('GET_CART_LIST_REQUEST', getCartListSaga);
  yield takeEvery('ADD_CART_TASK_REQUEST', addCartTaskSaga);
  yield takeEvery('DELETE_CART_TASK_REQUEST', deleteCartTaskSaga);
  yield takeEvery('EDIT_CART_TASK_REQUEST', editCartTaskSaga);
}
