export const registerAction = (params) => {
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

export const editUserInfoAction = (params) => {
  return {
    type: 'EDIT_USER_INFO_REQUEST',
    payload: params,
  }
}



export const getUserListAction = (params) => {
  return {
      type: 'GET_USER_LIST_REQUEST',
      payload: params
  }
}



export const deleteUserListAction = (params) => {
  return{
    type: 'DELETE_USER_LIST_REQUEST',
    payload: params,
  }
}

export const editUserListAction = (params) =>{
console.log("🚀 ~ file: user.action.js ~ line 49 ~ editUserListAction ~ params", params)
  return{
    type: 'EDIT_USER_LIST_REQUEST',
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
