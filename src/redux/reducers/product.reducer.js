const initialState = {
  productToDoList: [],
  productTaskDetail: {},
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      return {
        ...state,
        productToDoList: [
          ...state.productToDoList,
          action.payload,
        ],
      };
    }
    case 'EDIT_TASK': {
      const { index, title, description } = action.payload;
      const newProductToDoList = state.productToDoList;
      newProductToDoList.splice(index, 1, { title: title, description: description });
      return {
        ...state,
        productToDoList: [
          ...newProductToDoList,
        ],
      };
    }
    case 'DELETE_TASK': {
      const { index } = action.payload;
      const newProductToDoList = state.productToDoList;
      newProductToDoList.splice(index, 1);
      return {
        ...state,
        productToDoList: [
          ...newProductToDoList,
        ],
      };
    }
    case 'GET_TASK_DETAIL': {
      const { index } = action.payload;
      const productTaskDetail = state.productToDoList[index] ? state.productToDoList[index] : {};
      return {
        ...state,
        productTaskDetail: productTaskDetail,
      };
    }
    default: {
      return state;
    }
  }
}

export default productReducer;
