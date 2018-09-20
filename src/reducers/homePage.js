const homePage = (state = {email:"arvind",showLogin:true,isLoggedIn:false,invalidCredentials:false},action)=>{
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

    case 'INVALID_CREDENTIALS':
    return {
      ...state,
      invalidCredentials : true
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
