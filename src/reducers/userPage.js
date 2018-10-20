const updateUserPage = (state = { userId:"", activeElement: "team_list", teamCreated: false, teams: []}, action) => {
  switch (action.type) {
    case 'TEAM_CREATED':
      return {
        ...state,
        teamCreated : true
      }

    case 'GET_TEAMS_OF_USER':
      return {
        ...state,
        teams:action.teams
      }
    
    default:
      return state
  }
}

export default updateUserPage;
