const initialState = {
  voucherList: {
    data: [],
    load: false,
    error: '',
  },

};

export default function adminVoucherReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN/CREATE_VOUCHER_REQUEST': {
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: true,
        },
      }
    }

    case 'ADMIN/CREATE_VOUCHER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          data: data,
          load: false,
        },
      }
    }
    case 'ADMMIN/CREATE_VOUCHER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: false,
          error: error,
        },
      }
    }

    case 'ADMIN/GET_VOUCHER_REQUEST': {
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: true,
        },
      }
    }
    case 'ADMIN/GET_VOUCHER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          data: data,
          load: false,
        },
      }
    }
    case 'ADMIN/GET_VOUCHER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: false,
          error: error,
        },
      }
    }

    

    // Get Coupon Cho Product
    case 'GET_VOUCHER_PRODUCT_REQUEST': {
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: true,
        },
      }
    }
    case 'GET_VOUCHER_PRODUCT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_VOUCHER_PRODUCT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: false,
          error: error,
        },
      }
    }


    // Edit Coupon Code

    case 'ADMIN/EDIT_VOUCHER_REQUEST': {
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: true,
        },
      }
    }

    case 'ADMIN/EDIT_VOUCHER_SUCCESS': {
      const { data } = action.payload;
      const newVoucherList = state.voucherList.data
      const voucherIndex = newVoucherList.findIndex((item) => item.id === data.id);
      newVoucherList.splice(voucherIndex, 1, data);
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          data: newVoucherList,
          load:false,
        }
      }
    }

    case 'ADMIN/EDIT_VOICHER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: false,
          error: error,
        },
      };
    }

    // Delete Coupon Code
    case 'ADMIN/DELETE_VOUCHER_REQUEST': {
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: true,
        },
      }
    }


    case 'ADMIN/DELETE_VOUCHER_SUCCESS': {
      const { data } = action.payload;
      const newVoucherList = state.voucherList;
      const voucherIndex = newVoucherList.findIndex((item) => item.id === data.id);
      newVoucherList.splice(voucherIndex, 1);
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          data: newVoucherList,
          load:false
        }
      }
    }

    case 'ADMIN/DELETE_VOICHER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        voucherList: {
          ...state.voucherList,
          load: false,
          error: error,
        },
      };
    }



    default: {
      return state;
    }
  }
}
