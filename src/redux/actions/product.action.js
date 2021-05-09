export const addProductTaskAction = (params) => {
  return {
    type: 'ADD_PRODUCT_TASK_REQUEST',
    payload: params,
  }
}

export const editProductTaskAction = (params) => {
  return {
    type: 'EDIT_PRODUCT_TASK_REQUEST',
    payload: params,
  }
}

export const deleteProductTaskAction = (params) => {
  return {
    type: 'DELETE_PRODUCT_TASK_REQUEST',
    payload: params,
  }
}

export const getSortProductListAction = (params) => {
  return {
    type: 'GET_SORT_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export const searchProductAction = (params) => {
  return {
    type: 'SEARCH_PRODUCT_REQUEST',
    payload: params,
  }
}

export const decreaseProductListAction = (params) => {
  return {
    type: 'GET_DESC_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export const getProductDetailAction = (params) => {
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params,
  }
}
