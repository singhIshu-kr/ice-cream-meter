import updateUserPage from '../../src/reducers/userPage'

const types = {
  TEAM_CREATED: "TEAM_CREATED",
  ABC: "ABC",
  GET_TEAMS_OF_USER: "GET_TEAMS_OF_USER",
  SEARCH_TEAM: "SEARCH_TEAM",
  TEAM_DOESNOT_EXIST: "TEAM_DOESNOT_EXIST",
  INVALID_REQUEST:"INVALID_REQUEST",
  REQUEST_SENT:"REQUEST_SENT",
  GET_ACCESS_REQUESTS:"GET_ACCESS_REQUESTS"
}

describe('User Page reducer', () => {
  it('should return the isTeamCreated field as true on TEAM_CREATED action', () => {
    let action = { type : types.TEAM_CREATED};
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "", "invalidName": false, "newTeam": undefined, "requests": [], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined,action)).toEqual(expectedState);
  });

  it('should return the default state when action does not match', () => {
    let action = { type: types.ABC };
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "", "invalidName": false, "newTeam": null, "requests": [], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return the list of all the teams on GET_TEAMS_OF_USER', () => {
    let action = { type: types.GET_TEAMS_OF_USER, teams:[{userId:"abcd",teamId:"1234",role:"ADMIN"}]};
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "", "invalidName": false, "newTeam": null, "requests": [], "searchedTeam": "", "teams": [{ "role": "ADMIN", "teamId": "1234", "userId": "abcd" }], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return the name of the searchedTeam on SEARCH_TEAM action', () => {
    let action = { type: types.SEARCH_TEAM, searchedTeam: "abcd"};
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "", "invalidName": false, "newTeam": null, "requests": [], "searchedTeam": "abcd", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return invalidName as true on TEAM_DOESNOT_EXIST action', () => {
    let action = { type: types.TEAM_DOESNOT_EXIST};
    let expectedState = { "activeElement": "team_list", "errorMessage": "No team found with this name", "infoMessage": "", "invalidName": true, "newTeam": null, "requests": [], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return error message for INVALID_REQUEST action', () => {
    let action = { type: types.INVALID_REQUEST };
    let expectedState = { "activeElement": "team_list", "errorMessage": "You are requesting access for your own team.", "infoMessage": "", "invalidName": true, "newTeam": null, "requests": [], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return info message for REQUEST_SENT action', () => {
    let action = { type: types.REQUEST_SENT};
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "Request Sent", "invalidName": false, "newTeam": null, "requests": [], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });

  it('should return list of access requests for GET_ACCESS_REQUESTS action', () => {
    let action = { type: types.GET_ACCESS_REQUESTS, accessRequests: [{ "userId": "abcd@gmail.com", "teamId": "Ishu", "role": "WAITING" }]};
    let expectedState = { "activeElement": "team_list", "errorMessage": "", "infoMessage": "", "invalidName": false, "newTeam": null, "requests": [{ "userId": "abcd@gmail.com", "teamId": "Ishu", "role": "WAITING" }], "searchedTeam": "", "teams": [], "userId": "" };
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });
});
