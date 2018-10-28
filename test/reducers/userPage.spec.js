import updateUserPage from '../../src/reducers/userPage'

const types = {
  TEAM_CREATED: "TEAM_CREATED",
  ABC: "ABC",
  GET_TEAMS_OF_USER: "GET_TEAMS_OF_USER",
  SEARCH_TEAM: "SEARCH_TEAM",
  TEAM_DOESNOT_EXIST: "TEAM_DOESNOT_EXIST" 
}

describe('User Page reducer', () => {
  it('should return the isTeamCreated field as true on TEAM_CREATED action', () => {
    let action = { type : types.TEAM_CREATED};
    let expectedState = { "activeElement": "team_list", "newTeam": undefined, "teams": [], "userId": "", "searchedTeam": "", invalidName: false};
    expect(updateUserPage(undefined,action)).toEqual(expectedState);
  });

  it('should return the default state when action does not match', () => {
    let action = { type: types.ABC };
    let expectedState = { "activeElement": "team_list", "newTeam": null, "teams": [], "userId": "",
      "searchedTeam": "", invalidName: false};
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return the list of all the teams on GET_TEAMS_OF_USER', () => {
    let action = { type: types.GET_TEAMS_OF_USER, teams:[{userId:"abcd",teamId:"1234",role:"ADMIN"}]};
    let expectedState = { "activeElement": "team_list", "newTeam": null, "teams": [{ "role": "ADMIN", "teamId": "1234", "userId": "abcd" }], "userId": "", "searchedTeam": "", invalidName: false};
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return the name of the searchedTeam on SEARCH_TEAM action', () => {
    let action = { type: types.SEARCH_TEAM, searchedTeam: "abcd"};
    let expectedState = { "activeElement": "team_list", "newTeam": null, "teams": [], "userId": "",
      "searchedTeam": "abcd", invalidName: false};
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return invalidName as true on TEAM_DOESNOT_EXIST action', () => {
    let action = { type: types.TEAM_DOESNOT_EXIST};
    let expectedState = {
      "activeElement": "team_list", "newTeam": null, "teams": [], "userId": "",
      "searchedTeam": "", "invalidName": true
    };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });
});
