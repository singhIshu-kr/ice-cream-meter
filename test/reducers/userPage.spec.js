import updateUserPage from '../../src/reducers/userPage'

const types = {
  TEAM_CREATED: "TEAM_CREATED",
  ABC: "ABC"
}

describe('User Page reducer', () => {
  it('should return the isTeamCreated field as true on TEAM_CREATED action', () => {
    let action = { type : types.TEAM_CREATED};
    let expectedState = { "teamCreated": true, "activeElement": "team_list", "userId": ""};
    expect(updateUserPage(undefined,action)).toEqual(expectedState);
  });

  it('should return the default state when action does not match', () => {
    let action = { type: types.ABC };
    let expectedState = { "teamCreated": false, "activeElement": "team_list", "userId": ""};
    expect(updateUserPage(undefined, action)).toEqual(expectedState);
  });
});
