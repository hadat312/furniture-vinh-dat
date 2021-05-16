export const registerAction = (params) => {
  // console.log("🚀 ~ file: user.action.js ~ line 2 ~ registerAction ~ params", params)
  return {
    type: 'ADD_REGISTER_REQUEST',
    payload: params
  }
}

export const loginAction = (params) => {
  return {
    type: 'LOGIN_REQUEST',
    payload: params,
  }
}

export const getUserInfoAction = (params) => {
  return {
    type: 'GET_USER_INFO_REQUEST',
    payload: params
  }
}

export const logoutTaskAction = (params) => {
  return {
    type: 'LOGOUT',
    payload: params,
  }
}

export const addUserTaskAction = (params) => {
  return {
    type: 'ADD_USER_TASK',
    payload: params,
  }
}

export const editUserTaskAction = (params) => {
  return {
    type: 'EDIT_USER_TASK',
    payload: params,
  }
}

export const deleteUserTaskAction = (params) => {
  return {
    type: 'DELETE_USER_TASK',
    payload: params,
  }
}

export const getUserTaskDetailAction = (params) => {
  return {
    type: 'GET_USER_TASK_DETAIL',
    payload: params,
  }
}
