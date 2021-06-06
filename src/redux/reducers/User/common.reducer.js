const initialState = {
  addressSelected: {},
  cartItemSelected: {},
};

export default function commonAddressReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADDRESS_SELECTED': {
      return {
        ...state,
        addressSelected: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}