const initialState = {
  productList: {
    data: [],
    load: false,
    error: '',
  },
  productDetail: {
    data: {
      itemCategory: {},
      sizes: [],
      colors: [],
    },
    load: false,
    error: '',
  },
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_SORT_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'GET_SORT_PRODUCT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_SORT_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }

    case 'SEARCH_PRODUCT_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'SEARCH_PRODUCT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'SEARCH_PRODUCT_SUCCESS': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_PRODUCT_DETAIL_REQUEST': {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
          error: error,
        },
      }
    }
    default: {
      return state;
    }
  }
}
