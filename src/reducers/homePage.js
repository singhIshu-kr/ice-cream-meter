const homePage = (state = { email: "arvind", showLogin: true, isLoggedIn: false, hasError: false, errorMessage:""},action)=>{
  switch (action.type) {
    case 'OPEN_TEAM':
      return {
        ...state,
        email:action.email
      }
    case 'TOGGLE_LOGIN':
    return {
      ...state,
      showLogin:!state.showLogin
    }

    case 'LOGIN_TEAM':
    return {
      ...state,
      isLoggedIn:true
    }

    case "ERROR":
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }

    case 'INVALID_CREDENTIALS':
    return {
      ...state,
      hasError: true,
      errorMessage: "Invalid Credentials"
    }

    case "IS_LOGGED_IN":
    return {
      ...state,
      isLoggedIn:true
    }

    default:
      return state;
  }
}

export default homePage;
