export const loginTaskAction = (params) => {
  return {
    type: 'LOGIN',
    payload: params,
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
