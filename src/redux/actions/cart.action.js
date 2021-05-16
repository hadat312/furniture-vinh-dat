export function getCartListAction(params) {
  return {
    type: 'GET_CART_LIST_REQUEST',
    payload: params,
  }
}

export const addCartTaskAction = (params) => {
  return {
    type: 'ADD_CART_TASK_REQUEST',
    payload: params,
  }
}

export const editCartTaskAction = (params) => {
  return {
    type: 'EDIT_CART_TASK_REQUEST',
    payload: params,
  }
}

export const deleteCartTaskAction = (params) => {
  return {
    type: 'DELETE_CART_TASK_REQUEST',
    payload: params,
  }
}
