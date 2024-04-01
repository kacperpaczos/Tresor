const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
        return { ...state, isLoading: true, error: null };
      case 'USER_LOGIN_SUCCESS':
        return { ...state, isLoading: false, currentUser: action.payload };
      case 'USER_LOGIN_FAILURE':
        return { ...state, isLoading: false, error: action.payload };
      // Dodaj więcej przypadków w razie potrzeby
      default:
        return state;
    }
  }
  
  export default userReducer;