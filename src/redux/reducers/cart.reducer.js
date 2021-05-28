const initialState = {
  cartList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CART_LIST_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true,
        },
      }
    }
    case 'GET_CART_LIST_SUCCESS': {
      const { data, userId } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          userId: userId,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CART_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data.carts,
          load: false,
        },
      }
    }

    case 'ADD_CART_TASK_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true
        },
      };
    }
    case 'ADD_CART_TASK_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false
        },
      };
    }

    case 'ADD_WISH_LIST_TO_CART_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false
        },
      };
    }

    case 'ADD_CART_TASK_FAIL': {
      
      return {
        ...state,
        cartList: {
          ...state.cartList.data,
          load: false
        },
      };
    }
    case 'EDIT_CART_TASK_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true
        },
      };
    }
    case 'EDIT_CART_TASK_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false
        },
      };
    }
    case 'ADD_ORDER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [],
          load: false
        },
      };
    }
    // case 'EDIT_CART_TASK_SUCCESS': {
    //   const { id, data } = action.payload;
    //   const newCart = state.cart.data;
    //   newCart.splice(id, 1, data);
    //   return {
    //     ...state,
    //     cart: {
    //       ...state.cart,
    //       data: newCart,
    //       load: false
    //     },
    //   };
    // }
    case 'EDIT_CART_TASK_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          error: error,
          load: false
        },
      };
    }
    case 'DELETE_CART_TASK_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true
        },
      };
    }
    case 'DELETE_CART_TASK_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false
        },
      };
    }
    // case 'DELETE_CART_TASK_SUCCESS': {
    //   const id = action.payload;
    //   const newCart = state.cart.data.filter((cart) => cart.id !== id);
    //   return {
    //     ...state,
    //     cart: {
    //       ...state.cart,
    //       data: newCart,
    //       load: false
    //     },
    //   };
    // }
    case 'DELETE_CART_TASK_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          error: error,
          load: false
        },
      };
    }

    case 'CLEAR_CART_TASK_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true
        },
      };
    }
    case 'CLEAR_CART_TASK_SUCCESS': {
      return {
        ...state,
        cartList:{
          data:[],
          load:false
        },
      }
    }
    case 'CLEAR_CART_TASK_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
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
