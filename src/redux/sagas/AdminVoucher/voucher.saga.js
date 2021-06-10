import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../../utils/history'
import { ROUTERS } from '../../../constants/router'


function* createVoucherAdminSaga(action) {
  try {
    const { voucherName, voucherPrice, voucherCode } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/voucher',
      data: {
        voucherName: voucherName,
        // categoryId: categoryId,
        // productId: productId,
        voucherCode: voucherCode,
        voucherPrice: voucherPrice,
      }
    });
    yield put({
      type: 'ADMIN/CREATE_VOUCHER_SUCCESS',
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: 'CREATE_VOUCHER_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}



function* editVoucherAdminSaga(action) {
  try {
    const { id,newVoucher} = action.payload;
    const editResult = yield axios({
      method: 'PATCH',
      url: `http://localhost:3002/voucher/${id}`,
      data: {
      voucherName:newVoucher.voucherName,
      voucherCode:newVoucher.voucherCode,
      voucherPrice:newVoucher.voucherPrice,
      }
    });
    // yield put({ type: "ADMIN/GET_VOUCHER_REQUEST" });
    yield put({
      type: "ADMIN/EDIT_VOUCHER_SUCCESS",
      payload: {
        data: editResult.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADMIN/EDIT_VOUCHER_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteVoucherListSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3002/voucher/${id}`,
    });

    yield put({ type: "ADMIN/GET_VOUCHER_REQUEST" });
    yield put({
      type: "DELETE_VOUCHER_LIST_SUCCESS",
      payload: id
    });
  } catch (e) {
    yield put({
      type: "DELETE_VOUCHER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getVoucherAdminSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/voucher`,

    });
    yield put({
      type: 'ADMIN/GET_VOUCHER_SUCCESS',
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: 'ADMIN/GET_VOUCHER_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}

// Get Coupon Product theo productID

function* getVoucherProductAction(action) {
  try {
    const { productId } = action.payload
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/voucher`,
      params: {
        productId: productId
      }

    });
    yield put({
      type: 'ADMIN/GET_VOUCHER_SUCCESS',
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: 'ADMIN/GET_VOUCHER_FAIL',
      payload: {
        error: e.error
      },
    });
  }
}


export default function* voucherSaga() {

  yield takeEvery('ADMIN/CREATE_VOUCHER_REQUEST', createVoucherAdminSaga);

  yield takeEvery('ADMIN/GET_VOUCHER_REQUEST', getVoucherAdminSaga);

  yield takeEvery('ADMIN/DELETE_VOUCHER_REQUEST', deleteVoucherListSaga);

  yield takeEvery('ADMIN/EDIT_VOUCHER_REQUEST', editVoucherAdminSaga)
}