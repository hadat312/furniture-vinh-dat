export function getWishListAction(params) {
  return {
    type: 'GET_WISH_LIST_REQUEST',
    payload: params,
  }
}

export const addWishlistTaskAction = (params) => {
console.log("🚀 ~ file: wishlist.action.js ~ line 9 ~ addWishlistTaskAction ~ params", params)
  return {
    type: 'ADD_WISH_LIST_TASK_REQUEST',
    payload: params,
  }
}

export const deleteWishlistTaskAction = (params) => {
  return {
    type: 'DELETE_WISH_LIST_TASK_REQUEST',
    payload: params,
  }
}

export const addWishListToCartAction = (params) => {
  return {
    type: 'ADD_WISH_LIST_TO_CART_REQUEST',
    payload: params,
  }
}



export const clearWishListTaskAction = (params) => {
  return{
    type:'CLEAR_WISH_LIST_TASK_REQUEST',
    payload:params,
  }
}

