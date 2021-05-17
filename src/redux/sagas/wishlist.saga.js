import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getWishlistSaga(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/users',
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
    //       wishlist: [],
    //     }
    //   });
    //   yield put({
    //     type: "GET_CART_LIST_SUCCESS",
    //     payload: {
    //       data: newResult.data.cart,
    //       orderId: newResult.data.id
    //     },
    //   });
    // } else {
    //   yield put({
    //     type: "GET_CART_LIST_SUCCESS",
    //     payload: {
    //       // get theo id(duy nhất) sẽ trả về 1 giá trị duy nhất => index = 0
    //       data: result.data[0].carts,
    //       orderId: result.data[0].id
    //     },
    //   });
    // }
    yield put({
      type: "GET_WISH_LIST_SUCCESS",
      payload: {
        data: result.data[0].wishlist,
        userId: userId
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
    const { wishlistId, options } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/wishlist',
      // data: {
      //   _id: id,
      //   image: image,
      //   name: name,
      //   size: size,
      //   color: color,
      //   quantity: quantity,
      //   price: price,
      //   userId: userId
      // }
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
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/wishlist/${id}`,
    });
    yield put({
      type: "DELETE_WISH_LIST_TASK_SUCCESS",
      payload: id
    });
  } catch (e) {
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
