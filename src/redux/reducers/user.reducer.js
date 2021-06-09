const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: '',
  },

  userList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REGISTER_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }

    case 'ADD_REGISTER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }

    case 'ADD_REGISTER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        }
      }
    }

    case 'LOGIN_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'LOGIN_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'LOGIN_FAIL': {
      const { error } = action.payload;
      console.log("🚀 ~ file: user.reducer.js ~ line 73 ~ userReducer ~ action.payload", action.payload)
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_USER_INFO_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_USER_INFO_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    // GET USER LIST

    case 'GET_USER_LIST_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      }
    }
    case 'GET_USER_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_USER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error: error,
        },
      }
    }

    // DELETE USER LIST REQUEST
    case 'DELETE_USER_LIST_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      }
    }
    case 'DELETE_USER_LIST_SUCCESS': {
      const id = action.payload;
      const newUserList = state.userList.data.filter((userList) => userList.id !== id);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: newUserList,
          load: false,
        },
      };
    }

    case 'DELETE_USER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error: error,
        },
      };
    }

    // Edit User List
    case 'EDIT_USER_LIST_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      }
    }

    case 'EDIT_USER_LIST_SUCCESS': {
      const { data } = action.payload;
      const newUserList = state.userList.data
      const userListIndex = newUserList.findIndex((item) => item.id === data.id);
      newUserList.slice(userListIndex, 1, data);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: newUserList,
          load: false,
        },
      };
    }

    case 'EDIT_USER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error: error,
        },
      };
    }

    case 'EDIT_USER_INFO_REQUEST': {
      return {
        ...state,
        cart: {
          ...state.cart,
          load: true
        },
      };
    }
    // case 'EDIT_USER_INFO_SUCCESS': {
    //   const { id, data } = action.payload;
    //   const newUserInfo = state.userInfo.data;
    //   newUserInfo.splice(id, 1, data);
    //   return {
    //     ...state,
    //     userInfo: {
    //       ...state.userInfo,
    //       data: newUserInfo,
    //       load: false
    //     },
    //   };
    // }
    case 'EDIT_USER_INFO_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          error: error,
          load: false
        },
      };
    }

    case 'ADD_USER_TASK_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }

    case 'ADD_USER_TASK_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }

    case 'ADD_USER_TASK_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        }
      }
    }

    case 'ADD_USER_LIST_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      }
    }

    case 'ADD_USER_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          data: [
            ...state.userList.data,
            data,
          ],
          load: false,
        },
      }
    }

    case 'ADD_USER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error: error,
        }
      }
    }

    // Update Admin profile
    case 'UPDATE_PROFILE_ADMIN_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }

    case 'UPDATE_PROFILE_ADMIN_SUCCESS': {
      const { data } = action.payload;
      const newUser = state.userInfo.data
      const newUserIndex = newUser.findIndex((item) => item.id === data.id);
      newUser.slice(newUserIndex, 1, data);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: newUser,
          load: false,
        },
      };
    }

    case 'UPDATE_PROFILE_ADMIN_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      };
    }

    //  change Password
    case 'CHANGE_PASSWORD_ADMIN_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }

    case 'CHANGE_PASSWORD_ADMIN_SUCCESS': {
      const { data } = action.payload;
      console.log("🚀 ~ file: user.reducer.js ~ line 378 ~ userReducer ~ data", data)
      const newPassWord = state.userInfo.data
      const passWordIndex = newPassWord.findIndex((item) => item.id === data.id);
      newPassWord.slice(passWordIndex, 1, data);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: newPassWord,
          load: false,
        },
      };
    }

    case 'CHANGE_PASSWORD_ADMIN_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      };
    }


    default: {
      return state;
    }
  }
}
