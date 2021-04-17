const initialState = {
  userToDoList: [],
  userTaskDetail: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        userToDoList: [
          ...state.userToDoList,
          action.payload,
        ],
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        userToDoList: [
          ...state.userToDoList,
          action.payload,
        ],
      };
    }
    case 'ADD_USER_TASK': {
      return {
        ...state,
        userToDoList: [
          ...state.userToDoList,
          action.payload,
        ],
      };
    }
    case 'EDIT_USER_TASK': {
      const { index, title, description } = action.payload;
      const newUserToDoList = state.userToDoList;
      newUserToDoList.splice(index, 1, { title: title, description: description });
      return {
        ...state,
        userToDoList: [
          ...newUserToDoList,
        ],
      };
    }
    case 'DELETE_USER_TASK': {
      const { index } = action.payload;
      const newUserToDoList = state.userToDoList;
      newUserToDoList.splice(index, 1);
      return {
        ...state,
        userToDoList: [
          ...newUserToDoList,
        ],
      };
    }
    case 'GET_USER_TASK_DETAIL': {
      const { index } = action.payload;
      const userTaskDetail = state.userToDoList[index] ? state.toDoList[index] : {};
      return {
        ...state,
        userTaskDetail: userTaskDetail,
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
