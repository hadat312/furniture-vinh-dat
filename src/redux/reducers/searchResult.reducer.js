const initialState = {
  searchResultList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function searchResultsReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        searchResultList: {
          ...state.searchResultList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SUCCESS': {
      const { data, page, more } = action.payload;
      if (more) {
        return {
          ...state,
          searchResultList: {
            ...state.searchResultList,
            data: [
              //kế thừa lại data cũ
              ...state.searchResultList.data,
              //cập nhật thêm data mới
              ...data,
            ],
            page: page,
            load: false,
          },
        }
      } else {
        return {
          ...state,
          searchResultList: {
            ...state.searchResultList,
            data: data,
            page: page,
            load: false,
          },
        }
      }
    }
    case 'GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        searchResultList: {
          ...state.searchResultList,
          load: false,
          error: error,
        },
      }
    }

    case 'ADD_CART_TASK_REQUEST': {
      return {
        ...state,
        searchResultList: {
          ...state.searchResultList,
          load: true
        },
      };
    }
    case 'ADD_CART_TASK_SUCCESS': {
      // const { data } = action.payload;
      // return {
      //   ...state,
      //   searchResultList: {
      //     data: data,
      //     load: false
      //   },
      // };
    }

    case 'ADD_CART_TASK_FAIL': {
      
      return {
        ...state,
        searchResultList: {
          ...state.searchResultList.data,
          load: false
        },
      };
    }
    default: {
      return state;
    }
  }
}
