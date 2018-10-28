const initialState = { userId: "", activeElement: "team_list", newTeam: null, teams: [], searchedTeam: ""};

const updateUserPage = (state = initialState, action) => {
  switch (action.type) {
    case 'TEAM_CREATED':
      return {
        ...state,
        newTeam: action.newTeam
      }

    case 'SEARCH_TEAM':
      return {
        ...state,
        searchedTeam: action.searchedTeam
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
