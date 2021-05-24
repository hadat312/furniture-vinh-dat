const initialState = {
  address: {
    data: [],
    load: false,
    error: '',
  },
  city: {
    data: [],
    load: false,
    error: '',
  },
  district: {
    data: [],
    load: false,
    error: '',
  },
  ward: {
    data: [],
    load: false,
    error: '',
  },
};

export default function addressReducer(state = initialState, action) {
  switch (action.type) {


    //ADDRESS
    
    case 'ADD_ADDRESS_REQUEST': {
      return {
        ...state,
        address: {
          ...state.address,
          load: true
        },
      };
    }
    case 'ADD_ADDRESS_SUCCESS': {
      const { data } = action.payload;
      console.log("🚀 ~ file: address.reducer.js ~ line 84 ~ addressReducer ~ action.payload", action.payload)
      return {
        ...state,
        address: {
          ...state.address,
          data: data,
          load: false
        },
      };
    }
    case 'ADD_ADDRESS_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        address: {
          ...state.address,
          error: error,
          load: false
        },
      };
    }
    // CITY
    case 'GET_CITY_REQUEST': {
      return {
        ...state,
        city: {
          ...state.city,
          load: true,
        },
      }
    }
    case 'GET_CITY_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        city: {
          ...state.city,
          data: data,
          load: false,
        },
      }
    }

    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        address: {
          ...state.address,
          data: data.address,
          load: false,
        },
      }
    }

    case 'GET_CITY_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        city: {
          ...state.city,
          load: false,
          error: error,
        },
      }
    }



    // DISTRICT
    case 'GET_DISTRICT_REQUEST': {
      return {
        ...state,
        district: {
          ...state.district,
          load: true,
        },
      }
    }
    case 'GET_DISTRICT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        district: {
          ...state.district,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_DISTRICT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        district: {
          ...state.district,
          load: false,
          error: error,
        },
      }
    }

    // WARD
    case 'GET_WARD_REQUEST': {
      return {
        ...state,
        ward: {
          ...state.ward,
          load: true,
        },
      }
    }
    case 'GET_WARD_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        ward: {
          ...state.ward,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_WARD_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        ward: {
          ...state.ward,
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
