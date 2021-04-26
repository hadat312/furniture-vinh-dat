const initialState = {
  cart: {
    data: [],
    load: false,
    error: '',
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CART_REQUEST': {
      return {
        ...state,
        cart: {
          ...state.cart,
          load: true,
        },
      }
    }
    case 'GET_CART_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CART_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          load: false,
          error: error,
        },
      }
    }
    case 'ADD_CART_TASK_REQUEST': {
      return {
        ...state,
        cart: {
          ...state.cart,
          load: true
        },
      };
    }
    case 'ADD_CART_TASK_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          data: data,
          load: false
        },
      };
    }
    case 'ADD_CART_TASK_FAIL': {
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
    case 'DELETE_CART_TASK_REQUEST': {
      return {
        ...state,
        cart: {
          ...state.cart,
          load: true
        },
      };
    }
    case 'DELETE_CART_TASK_SUCCESS': {
      const { id } = action.payload;
      const newCart = state.cart.data;
      newCart.splice(id, 1);
      return {
        ...state,
        cart: {
          data: {...newCart},
          load: false
        },
      };
    }
    case 'DELETE_CART_TASK_FAIL': {
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
    default: {
      return state;
    }
  }
}
