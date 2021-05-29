const initialState = {
  couponList: {
    data: [],
    load: false,
    error: '',
  },

};

export default function adminCouponReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN/CREATE_COUPON_REQUEST': {
      return {
        ...state,
        couponList: {
          ...state.couponList,
          load: true,
        },
      }
    }

    case 'ADMIN/CREATE_COUPON_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        couponList: {
          ...state.couponList,
          data: data,
          load: false,
        },
      }
    }
    case 'ADMMIN/CREATE_COUPON_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        couponList: {
          ...state.couponList,
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
