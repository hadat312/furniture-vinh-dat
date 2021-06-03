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
      const { id, data } = action.payload;
      // console.log("🚀 ~ file: user.reducer.js ~ line 197 ~ userReducer ~ id", id)
      const anotherUserList = state.userList.data;
      anotherUserList.splice(id, 1, data);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: anotherUserList,
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
      console.log("🚀 ~ file: user.reducer.js ~ line 268 ~ userReducer ~ data", data)
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

    default: {
      return state;
    }
  }
}
