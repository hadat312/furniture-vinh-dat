export function getSearchResultsAction(params) {
  return {
    type: 'GET_SEARCH_RESULTS_REQUEST',
    payload: params,
  }
}

export const addSearchResultsAction = (params) => {
  return {
    type: 'ADD_SEARCH_RESULTS_REQUEST',
    payload: params,
  }
}