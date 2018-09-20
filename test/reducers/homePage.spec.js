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
    expect(homePgReducer(undefined, action)).toEqual({ "email": "arvind", "invalidCredentials": false, "isLoggedIn": false, "showLogin": true })
  })

  it('should return the toggled login on toggle action', () => {
    const action = { type: "TOGGLE_LOGIN" };
    const state = { email: "", showLogin: true };
    expect(homePgReducer(state, action)).toEqual({
      email: "",
      showLogin: false
    })
  });
});
