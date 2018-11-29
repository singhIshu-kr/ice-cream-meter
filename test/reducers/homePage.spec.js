import homePgReducer from '../../src/reducers/homePage';

const types = {
  openTeam: "OPEN_TEAM"
}

describe('Home Page Reducer', () => {
  it('should set the email when action type is Open_team', () => {
    let action = { type: "OPEN_TEAM", email: "abc" };
    expect(homePgReducer({ email: "" }, action)).toEqual({
      email: "abc"
    })
  });

  it('should return the current state when action type does not match', () => {
    let action = { type: "FOO", email: "abc" };
    expect(homePgReducer({ email: "" }, action)).toEqual({
      email: ""
    })
  })

  it('should return initial state when action does not match', () => {
    let action = { type: "FOO", email: "abc" };
    expect(homePgReducer(undefined, action)).toEqual({ "email": "arvind", "errorMessage": "", "hasError": false, "isLoggedIn": false, "showLogin": true })
  })

  it('should return the toggled login on toggle action', () => {
    const action = { type: "TOGGLE_LOGIN" };
    const state = { email: "", showLogin: true };
    expect(homePgReducer(state, action)).toEqual({
      "email": "",
      "showLogin": false
    })
  });

  it('should return the login team on login action', () => {
    const action = { type: "LOGIN_TEAM"};
    const state = { email: "", isLoggedIn: true };
    expect(homePgReducer(state,action)).toEqual({
      "email":"",
      "isLoggedIn":true
    })
  });

  it('should return invalid credentials true on invalid credentials', () => {
    const action = { type: "INVALID_CREDENTIALS" };
    const state = { email: "", isLoggedIn: true, invalidCredentials:false};
    expect(homePgReducer(state, action)).toEqual({ "email": "", "errorMessage": "Invalid Credentials", "hasError": true, "invalidCredentials": false, "isLoggedIn": true })
  });

  it('should return is loggedIn true on is loggedIn action ', () => {
    const action = { type: "IS_LOGGED_IN" };
    const state = { email: "", isLoggedIn: false};
    expect(homePgReducer(state, action)).toEqual({
      "email": "",
      "isLoggedIn": true
    })
  });
});
