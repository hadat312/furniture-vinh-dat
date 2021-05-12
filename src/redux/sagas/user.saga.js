import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../utils/history';

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
        }
      });
      // console.log("🚀 ~ file: user.saga.js ~ line 21 ~ function*registerSaga ~ result", result)
      yield put({
        type: 'ADD_REGISTER_SUCCESS',
        payload: {
          data: result.data,
        },
      });
      yield history.push('/login')
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
    // console.log("🚀 ~ file: user.saga.js ~ line 65 ~ function*loginSaga ~ result", result)
    if (result.data.length > 0) {
      localStorage.setItem('userInfo', JSON.stringify(result.data[0]));
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      if (result.data[0].userRole === 'customer') {
        yield history.push('/about');
      } else {
        yield history.push('/admin');
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

export default function* userSaga() {
  yield takeEvery('ADD_REGISTER_REQUEST', registerSaga)
  yield takeEvery('LOGIN_REQUEST', loginSaga);
  yield takeEvery('GET_USER_INFO_REQUEST', getUserInfoSaga);
}
