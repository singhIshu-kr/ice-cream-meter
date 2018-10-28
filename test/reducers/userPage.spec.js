import updateUserPage from '../../src/reducers/userPage'

const types = {
  TEAM_CREATED: "TEAM_CREATED",
  ABC: "ABC",
  GET_TEAMS_OF_USER: "GET_TEAMS_OF_USER"
}

describe('User Page reducer', () => {
  it('should return the isTeamCreated field as true on TEAM_CREATED action', () => {
    let action = { type : types.TEAM_CREATED};
    let expectedState = { "activeElement": "team_list", "newTeam": undefined, "teams": [], "userId": "" };
    expect(updateUserPage(undefined,action)).toEqual(expectedState);
  });

  it('should return the default state when action does not match', () => {
    let action = { type: types.ABC };
    let expectedState = { "activeElement": "team_list", "newTeam": null, "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return the list of all the teams on GET_TEAMS_OF_USER', () => {
    let action = { type: types.GET_TEAMS_OF_USER, teams:[{userId:"abcd",teamId:"1234",role:"ADMIN"}]};
    let expectedState = { "activeElement": "team_list", "newTeam": null, "teams": [{ "role": "ADMIN", "teamId": "1234", "userId": "abcd" }], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });
});
