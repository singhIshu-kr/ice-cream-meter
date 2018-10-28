const updateUserPage = (state = { userId:"", activeElement: "team_list", newTeam: null, teams: []}, action) => {
  switch (action.type) {
    case 'TEAM_CREATED':
    console.log(action)
      return {
        ...state,
        newTeam : action.newTeam
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
