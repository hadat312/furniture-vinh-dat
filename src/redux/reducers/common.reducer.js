const initialState = {
  addressSelected: {},
};

export default function commonAddressReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADDRESS_SELECTED': {
      return {
        ...state,
        addressSelected: action.payload,
      }
    }
    // case 'CREATE_OPTION_SUCCESS': {
    //   const { data } = action.payload;
    //   return {
    //     ...state,
    //     productSelected: {
    //       ...state.productSelected,
    //       productOptions: [
    //         ...state.productSelected.productOptions,
    //         data,
    //       ]
    //     }
    //   }
    // }
    // case 'ADMIN/EDIT_OPTION_SUCCESS': {
    //   const { data } = action.payload;
    //   const newProductOptions = state.productSelected.productOptions;
    //   const optionIndex = newProductOptions.findIndex((item) => item.id === data.id);
    //   newProductOptions.splice(optionIndex, 1, data);
    //   return {
    //     ...state,
    //     productSelected: {
    //       ...state.productSelected,
    //       productOptions: newProductOptions,
    //     }
    //   }
    // }
    // case 'ADMIN/DELETE_OPTION_SUCCESS': {
    //   const { data } = action.payload;
    //   const newProductOptions = state.productSelected.productOptions;
    //   const optionIndex = newProductOptions.findIndex((item) => item.id === data.id);
    //   newProductOptions.splice(optionIndex, 1);
    //   return {
    //     ...state,
    //     productSelected: {
    //       ...state.productSelected,
    //       productOptions: newProductOptions,
    //     }
    //   }
    // }
    default: {
      return state;
    }
  }
}