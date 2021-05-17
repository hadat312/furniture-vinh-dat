export function getOrderListAction(params) {
  return {
    type: 'GET_ORDER_LIST_REQUEST',
    payload: params,
  }
}

export const addOrderAction = (params)=> {
  return {
    type: 'ADD_ORDER_REQUEST',
    payload: params,
  }
}