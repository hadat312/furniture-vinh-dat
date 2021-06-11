export function setProductSelectAction(params) {
  console.log("🚀 ~ file: common.action.js ~ line 2 ~ setProductSelectAction ~ params", params)
  return {
    type: 'ADMIN/SET_PRODUCT_SELECTED',
    payload: params,
  }
}

export function setColorSelectAction(params) {
  return {
    type: 'ADMIN/SET_COLOR_SELECTED',
    payload: params,
  }
}

