export function setProductSelectAction(params) {
  return {
    type: 'ADMIN/SET_PRODUCT_SELECTED',
    payload: params,
  }
}

export function setColorSelectAction(params) {
  // console.log("🚀 ~ file: common.action.js ~ line 9 ~ setColorSelectAction ~ params", params)
  return {
    type: 'ADMIN/SET_COLOR_SELECTED',
    payload: params,
  }
}

