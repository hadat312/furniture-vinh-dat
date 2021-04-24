const initialState = {
  categories: {
    data: [],
    load: false,
    error: '',
  },
  subCategories: {
    data: [],
    load: false,
    error: '',
  },
  itemCategories: {
    data: [],
    load: false,
    error: '',
  },
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {

    // CATEGORY
    case 'GET_CATEGORIES_REQUEST': {
      return {
        ...state,
        categories: {
          ...state.categories,
          load: true,
        },
      }
    }
    case 'GET_CATEGORIES_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        categories: {
          ...state.categories,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CATEGORIES_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categories: {
          ...state.categories,
          load: false,
          error: error,
        },
      }
    }

    // SUBCATEGORY
    case 'GET_SUB_CATEGORIES_REQUEST': {
      return {
        ...state,
        subCategories: {
          ...state.subCategories,
          load: true,
        },
      }
    }
    case 'GET_SUB_CATEGORIES_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        subCategories: {
          ...state.subCategories,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_SUB_CATEGORIES_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        subCategories: {
          ...state.subCategories,
          load: false,
          error: error,
        },
      }
    }

    // ITEM CATEGORY
    case 'GET_ITEM_CATEGORIES_REQUEST': {
      return {
        ...state,
        itemCategories: {
          ...state.itemCategories,
          load: true,
        },
      }
    }
    case 'GET_ITEM_CATEGORIES_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        itemCategories: {
          ...state.itemCategories,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ITEM_CATEGORIES_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        itemCategories: {
          ...state.itemCategories,
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
