import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* addBillTaskSaga(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      address,
      country,
      city,
      userId,
    } = action.payload
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/bill',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        company: company,
        address: address,
        country: country,
        city: city,
        userId: userId,

      }
    });
    yield put({
      type: "ADD_BILL_TASK_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_BILL_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* billSaga() {
  yield takeEvery('ADD_BILL_TASK_REQUEST', addBillTaskSaga);
}
