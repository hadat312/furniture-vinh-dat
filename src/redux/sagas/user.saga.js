import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';

function* registerSaga(action) {
  try {
    const { userEmail, userPassword, userName, userPhoneNumber } = action.payload;
    const user = yield axios.get('http://localhost:3002/users')
    const check = user.data.find(user => user.userEmail === userEmail)
    if (check) {
      yield alert("Account already exists");
    } else {
      const result = yield axios({
        method: 'POST',
        url: 'http://localhost:3002/users',
        data: {
          userPassword, 
          userEmail,
          userName,
          userPhoneNumber,
          userRole: "customer",
          carts:[],
          wishlist:[],
          addresss:[],
        }
      });
      // console.log("🚀 ~ file: user.saga.js ~ line 21 ~ function*registerSaga ~ result", result)
      yield put({
        type: 'ADD_REGISTER_SUCCESS',
        payload: {
          data: result.data,
        },
      });
      yield history.push(ROUTERS.LOGIN)
    }
  } catch (e) {
    yield put({
      type: "ADD_REGISTER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* loginSaga(action) {
  try {
    const { userEmail, userPassword } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/users',
      params: {
        userEmail,
        userPassword,
      }
    });
    if (result.data.length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      if (result.data[0].userRole === 'customer') {
        yield history.push(ROUTERS.HOME);
      } else {
        yield history.push(ROUTERS.ADMIN);
      }
    } else {
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: 'Email hoặc mật khẩu không đúng',
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3002/users/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getUserListSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/users',
      params: {
        _page: page,
        _limit: limit,
      }
    })
    yield put({
      type: "GET_USER_LIST_SUCCESS",
      payload: {
        data: result.data,
      },

    });
  } catch (e) {
    yield put({
      type: "GET_USER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteUserListSaga(action) {
  try {
    const { id } = action.payload;
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/users/${id}`,
    });
    yield put({
      type: "DELETE_USER_LIST_SUCCESS",
      payload: id
    });
  } catch (e) {
    yield put({
      type: "DELETE_USER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

// Edit User List
function* editUserListSaga(action) {
  console.log("🚀 ~ file: user.saga.js ~ line 148 ~ function*editUserListSaga ~ action", action)
  try {
    const { id, userName, userEmail, userPhoneNumber } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${id}`,
      data: {
        userName: userName,
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber
      }
    });
    yield put({ type: "GET_USER_LIST_REQUEST" });
    yield put({
      type: "EDIT_USER_LIST_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "EDIT_USER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

// Edit User Info
function* editUserInfoSaga(action) {
  try {
    const { id, userEmail, gender, birthdayString, userPassword, userName, userPhoneNumber, address, userRole } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${id}`,
      data: {
        userEmail: userEmail,
        userPassword: userPassword,
        userName: userName,
        gender: gender,
        birthday: birthdayString,
        userPhoneNumber: userPhoneNumber,
        userRole: userRole,
        address: address,
      }
    });

    const userResult = yield axios({
      method: 'GET',
      url: `http://localhost:3002/users/${id}`,
    });

    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: userResult.data,
      },
    });

    yield put({
      type: "EDIT_USER_INFO_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "EDIT_USER_INFO_FAIL",
      payload: {
        error: e.error
      },
    });
  }

}


export default function* userSaga() {
  yield takeEvery('ADD_REGISTER_REQUEST', registerSaga)
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);

  yield takeEvery('DELETE_USER_LIST_REQUEST', deleteUserListSaga);
  yield takeEvery('GET_USER_LIST_REQUEST', getUserListSaga);
  yield takeEvery('EDIT_USER_LIST_REQUEST', editUserListSaga);

  yield takeEvery('EDIT_USER_INFO_REQUEST',editUserInfoSaga)
}
