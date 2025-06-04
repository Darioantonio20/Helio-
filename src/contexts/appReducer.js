export const initialState = {
  loading: false,
  error: null,
  user: null,
  theme: 'light',
  isInitialized: false
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return {
        ...state,
        isInitialized: true
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    
    default:
      return state
  }
} 