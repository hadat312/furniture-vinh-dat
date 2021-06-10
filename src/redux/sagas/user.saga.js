import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';
import { ROUTERS } from '../../constants/router';

import { message } from 'antd';

function* registerSaga(action) {
  try {
    const { userEmail, userPassword, userName, userPhoneNumber } = action.payload;
    const user = yield axios.get('http://localhost:3002/users')
    const check = user.data.find(user => user.userEmail === userEmail);
    const checkUserName = user.data.find(user => user.userName === userName)

    if (check) {
      message.error("Tài khoản này đã tồn tại",[1.5])
    }
    else {
      const result = yield axios({
        method: 'POST',
        url: 'http://localhost:3002/users',
        data: {
          userPassword,
          userEmail,
          userName,
          userPhoneNumber,
          userRole: "customer",
          carts: [],
          wishlist: [],
          addresss: [],
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
      message.success("Đăng nhập thành công", [1.5])
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
      message.error("Tài khoản hoặc mật khẩu bạn nhập không đúng", [1.5])
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: "Email hoặc mật khẩu bạn nhập không đúng"
        },
      });
    }
  } catch (e) {

    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: "Email hoặc mật khẩu bạn nhập không đúng"
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
    const { page, limit, searchKey } = action.payload;
    // const  searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/users',
      params: {
        _page: page,
        _limit: limit,
        ...searchKey && { q: searchKey }
      }
    })

    yield put({
      type: "GET_USER_LIST_SUCCESS",
      payload: {
        data: result.data,
        payload: {}
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
  try {
    const { id, userRole } = action.payload;
    const editResult = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${id}`,
      data: {
        userRole: userRole,
      }
    });
    console.log("🚀 ~ file: user.saga.js ~ line 184 ~ function*editUserListSaga ~ editResult", editResult)

    // const userResult = yield axios({
    //   method: 'GET',
    //   url: `http://localhost:3002/users`,
    // });

    // yield put({
    //   type: 'GET_USER_LIST_REQUEST',
    //   payload: {
    //     data: userResult.data
    //   }
    // })


    yield put({
      type: "EDIT_USER_LIST_SUCCESS",
      payload: {
        id: id,
        data: editResult.data
      }
    });
    yield put({ type: "GET_USER_LIST_REQUEST", payload: {} });

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
    const { id, userEmail, gender, birthdayString, userPassword, userName, userImage, userPhoneNumber, address, userRole } = action.payload;
    console.log("🚀 ~ file: user.saga.js ~ line 194 ~ function*editUserInfoSaga ~ action.payload", action.payload)
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${id}`,
      data: {
        userEmail: userEmail,
        userPassword: userPassword,
        userName: userName,
        userImage: userImage,
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

function* addUserListSaga(action) {
  try {
    const { userPhoneNumber, userEmail, userName, userRoleName, userPassword, confirmPassword } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/users',
      data: {
        userPassword: userPassword,
        confirmPassword: confirmPassword,
        userEmail: userEmail,
        userName: userName,
        userPhoneNumber: userPhoneNumber,
        userRole: userRoleName || '',
        carts: [],
        wishlist: [],
        addresss: [],
      }
    });
    yield put({
      type: 'ADD_USER_LIST_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_USER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
// Update profile Admin

function* updateProfileAdminSaga(action) {
  try {
    const {userId,userPhoneNumber, userEmail, userName, birthday, gender } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
        userEmail: userEmail,
        userName: userName,
        userPhoneNumber: userPhoneNumber,
        birthday: birthday || '',
        gender: gender,
        carts: [],
        wishlist: [],
        addresss: [],
      }
    });
    console.log("🚀 ~ file: user.saga.js ~ line 318 ~ function*updateProfileAdminSaga ~ result", result)
    yield put({
      type: 'UPDATE_PROFILE_ADMIN_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "UPDATE_PROFILE_ADMIN_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* changePasswordAdminSaga(action) {
  try {
    const {userId,newPassWord,confirmPassword} = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/users/${userId}`,
      data: {
          userPassword: newPassWord,
          confirmPassword:confirmPassword
      }
    });
    yield put({
      type: 'CHANGE_PASSWORD_ADMIN_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "CHANGE_PASSWORD_ADMIN_FAIL",
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

  yield takeEvery('EDIT_USER_INFO_REQUEST', editUserInfoSaga);

  yield takeEvery('ADD_USER_LIST_REQUEST', addUserListSaga);

  yield takeEvery("UPDATE_PROFILE_ADMIN_REQUEST", updateProfileAdminSaga);

  yield takeEvery('CHANGE_PASSWORD_ADMIN_REQUEST',changePasswordAdminSaga)
}
