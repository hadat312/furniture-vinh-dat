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

export const addUserListAction = (params) => {
  return {
    type:'ADD_USER_LIST_'
  }
}

export const getUserInfoAction = (params) => {
  return {
      type: 'GET_USER_INFO_REQUEST',
      payload: params
  }
}

export const editUserInfoAction = (params) => {
console.log("🚀 ~ file: user.action.js ~ line 29 ~ editUserInfoAction ~ params", params)
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
  return{
    type: 'EDIT_USER_LIST_REQUEST',
    payload: params,
  }
}

export const addUserTaskAction = (params) => {
console.log("🚀 ~ file: user.action.js ~ line 61 ~ addUserTaskAction ~ params", params)
  return {
    type: 'ADD_USER_TASK_REQUEST',
    payload: params,
  }
}
