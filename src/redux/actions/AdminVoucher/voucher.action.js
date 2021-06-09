export const createVoucherAdminAction = (params) => {
  return {
    type: 'ADMIN/CREATE_VOUCHER_REQUEST',
    payload: params
  }
}

export const getVoucherAdminAction = (params) => {
  return {
    type: 'ADMIN/GET_VOUCHER_REQUEST',
    payload: params
  }
}

// Get Coupon  theo ProductId Cho Product

export const getVoucherProductAction = (params) => {
  return {
    type: 'GET_VOUCHER_PRODUCT_REQUEST',
    payload: params
  }
}

export const deleteVoucherAdminAction = (params) => {
  return {
    type: 'ADMIN/DELETE_VOUCHER_REQUEST',
    payload: params
  }
}

export const editVoucherAdminAction = (params) => {
console.log("🚀 ~ file: voucher.action.js ~ line 32 ~ editVoucherAdminAction ~ params", params)
  return {
    type: 'ADMIN/EDIT_VOUCHER_REQUEST',
    payload: params
  }
}
