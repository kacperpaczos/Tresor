const initialState = {
    posts: [],
    isLoading: false,
    error: null,
  };
  
  function postsReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_POSTS_REQUEST':
        return { ...state, isLoading: true };
      case 'FETCH_POSTS_SUCCESS':
        return { ...state, isLoading: false, posts: action.payload };
      case 'FETCH_POSTS_FAILURE':
        return { ...state, isLoading: false, error: action.payload };
      // Dodaj więcej przypadków w razie potrzeby
      default:
        return state;
    }
  }
  
  export default postsReducer;