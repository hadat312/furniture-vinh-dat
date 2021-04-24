
export function getCategoriesAction(params) {
  return {
    type: 'GET_CATEGORIES_REQUEST',
    payload: params,
  }
}

export function getSubCategoriesAction(params) {
  return {
    type: 'GET_SUB_CATEGORIES_REQUEST',
    payload: params,
  }
}

export function getItemCategoriesAction(params) {
  return {
    type: 'GET_ITEM_CATEGORIES_REQUEST',
    payload: params,
  }
}
