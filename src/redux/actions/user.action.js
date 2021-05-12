export const loginAction = (params) => {
  return {
    type: 'LOGIN_REQUEST',
    payload: params,
  }
}

export const logoutAction = (params) => {
  return {
    type: 'LOGOUT_REQUEST',
    payload: params,
  }
}

export const addUserAction = (params) => {
  return {
    type: 'ADD_USER_TASK',
    payload: params,
  }
}

export const editUserAction = (params) => {
  return {
    type: 'EDIT_USER_REQUEST',
    payload: params,
  }
}

export const deleteUserAction = (params) => {
  return {
    type: 'DELETE_USER_REQUEST',
    payload: params,
  }
}

export const getUserInfoAction = (params) => {
  return {
    type: 'GET_USER_INFO_REQUEST',
    payload: params,
  }
}
