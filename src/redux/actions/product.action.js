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

export const getTaskDetailAction = (params) => {
  return {
    type: 'GET_PRODUCT_TASK_DETAIL_REQUEST',
    payload: params,
  }
}
export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}
