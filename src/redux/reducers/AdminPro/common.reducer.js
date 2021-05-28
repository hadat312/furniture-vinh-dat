const initialState = {
  productSelected: {},

  colorSelected:{},
};

export default function commonProductReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN/SET_PRODUCT_SELECTED': {
      return {
        ...state,
        productSelected: action.payload,
      }
    }
    case 'ADMIN/CREATE_OPTION_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productSelected: {
          ...state.productSelected,
          sizes: [
            ...state.productSelected.sizes,
            data,
          ]
        }
      }
    }

    case 'ADMIN/SET_COLOR_SELECTED': {
      return {
        ...state,
        colorSelected: action.payload,
      }
    }
    case 'ADMIN/CREATE_COLOR_OPTION_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        colorSelected: {
          ...state.colorSelected,
          colors: [
            ...state.colorSelected.colors,
            data,
          ]
        }
      }
    }

    // case 'ADMIN/SET_COLOR_SELECTED': {
    //   return {
    //     ...state,
    //     colorSelected: action.payload,
    //   }
    // }

    // case 'ADMIN/CREATE_COLOR_OPTION_SUCCESS': {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     colorSelected: {
    //       ...state.colorSelected,
    //       colors: [
    //         ...state.colorSelected.colors,
    //         data,
    //       ]
    //     }
    //   }
    // }

    case 'ADMIN/EDIT_OPTION_SUCCESS': {
      const { data } = action.payload;
      const newProductOptions = state.productSelected.sizes;
      const optionIndex = newProductOptions.findIndex((item) => item.id === data.id);
      newProductOptions.splice(optionIndex, 1, data);
      return {
        ...state,
        productSelected: {
          ...state.productSelected,
          sizes: newProductOptions,
        }
      }
    }
    case 'ADMIN/DELETE_OPTION_SUCCESS': {
      const { data } = action.payload;
      const newProductOptions = state.productSelected.sizes;
      const optionIndex = newProductOptions.findIndex((item) => item.id === data.id);
      newProductOptions.splice(optionIndex, 1);
      return {
        ...state,
        productSelected: {
          ...state.productSelected,
          sizes: newProductOptions,
        }
      }
    }
    default: {
      return state;
    }
  }
}
