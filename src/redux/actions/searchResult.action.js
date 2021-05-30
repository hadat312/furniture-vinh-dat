export function getSearchResultsAction(params) {
  return {
    type: 'GET_SEARCH_RESULTS_REQUEST',
    payload: params,
  }
}

export const addSearchResultsAction = (params) => {
console.log("🚀 ~ file: searchResult.action.js ~ line 9 ~ addSearchResultsAction ~ params", params)
  return {
    type: 'ADD_SEARCH_RESULTS_REQUEST',
    payload: params,
  }
}