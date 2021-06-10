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
  console.log("🚀 ~ file: user.action.js ~ line 16 ~ addUserListAction ~ params", params)
  return {
    type: 'ADD_USER_LIST_REQUEST',
    payload: params
  }
}

export const editUserListAction = (params) => {
  return {
    type: 'EDIT_USER_LIST_REQUEST',
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
  return {
    type: 'DELETE_USER_LIST_REQUEST',
    payload: params,
  }
}


// Admin User
export const updateProfileAdminAction = (params) => {
console.log("🚀 ~ file: user.action.js ~ line 64 ~ updateProfileAdminAction ~ params", params)
  return {
    type: 'UPDATE_PROFILE_ADMIN_REQUEST',
    payload: params,
  }
}

export const changePasswordAdminAction = (params) => {
  return{
    type:'CHANGE_PASSWORD_ADMIN_REQUEST',
    payload:params
  }
}
