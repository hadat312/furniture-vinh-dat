const initialState = {
  orderList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ORDER_LIST_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        },
      }
    }
    case 'GET_ORDER_LIST_SUCCESS': {
      const { data, userId } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          userId: userId,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ORDER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: false,
          error: error,
        },
      }
    }
    ////////    
    case 'ADD_ORDER_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true
        },
      };
    }
    //khi vào trang profile thì nó chạy useEffect mounting, get orderList luôn, 
    // case 'ADD_ORDER_SUCCESS': {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     orderList: {
    //       ...state.orderList,
    //       data: [data],
    //       load: false
    //     },
    //   };
    // }
    case 'ADD_ORDER_FAIL': {
      return {
        ...state,
        orderList: {
          ...state.orderList.data,
          load: false
        },
      };
    }
    //////// 
    case 'EDIT_ORDER_REQUEST': {
      return {
        ...state,
        cart: {
          ...state.cart,
          load: true
        },
      };
    }
    case 'EDIT_ORDER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: false
        },
      };
    }
    case 'EDIT_ORDER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error: error,
          load: false
        },
      };
    }
    //////// 
    //case 'DELETE_ORDER_REQUEST': {
    //   return {
    //     ...state,
    //     cart: {
    //       ...state.cart,
    //       load: true
    //     },
    //   };
    // }
    // case 'DELETE_ORDER_SUCCESS': {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     orderList: {
    //       ...state.orderList,
    //       data: data,
    //       load: false
    //     },
    //   };
    // }
    // case 'DELETE_ORDER_FAIL': {
    //   const { error } = action.payload;
    //   return {
    //     ...state,
    //     orderList: {
    //       ...state.orderList,
    //       error: error,
    //       load: false
    //     },
    //   };
    // }
    default: {
      return state;
    }
  }
}
