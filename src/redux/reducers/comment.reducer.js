const initialState = {
  commentList: {
    data: [],
    load: false,
    error: '',
  },
};



export default function commentReducer(state = initialState, action) {
  switch (action.type) {

    // Get Comment
    case 'GET_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      }
    }
    case 'GET_COMMENT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error,
        },
      }
    }

    // ADD Comment
    case 'ADD_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      }
    }
    case 'ADD_COMMENT_SUCCESS': {
      const { data } = action.payload;
      const newComment = state.commentList.data;
      newComment.splice(0,0,data);
      return {
        ...state,
        commentList: {
          ...state.newComment,
          data: newComment,
          load: false,
        },
      }
    }
    case 'ADD_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
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
