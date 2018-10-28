const initialState = { userId: "", activeElement: "team_list", newTeam: null, teams: [], searchedTeam: "", invalidName: false};

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
        searchedTeam: action.searchedTeam,
        invalidName: false
      }

    case 'GET_TEAMS_OF_USER':
      return {
        ...state,
        teams:action.teams,
        invalidName: false
      }
    
    case 'TEAM_DOESNOT_EXIST':
      return {
        ...state,
        invalidName: true
      }
    default:
      return state
  }
}

export default updateUserPage;
