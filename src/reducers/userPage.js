const initialState = { userId: "", activeElement: "team_list", newTeam: null, teams: [], searchedTeam: "", invalidName: false, errorMessage: "", infoMessage:""};

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
        invalidName: false,
        infoMessage: ""
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
        searchedTeam:"",
        invalidName: true,
        errorMessage: "Invalid Name"
      }

    case 'INVALID_REQUEST':
      return {
        ...state,
        invalidName: true,
        errorMessage: "You are requesting access for your own team.",
        searchedTeam: ""
      }

    case 'REQUEST_SENT':
      return {
        ...state,
        infoMessage: "Request Sent",
        searchedTeam: ""
      }

    default:
      return state
  }
}

export default updateUserPage;
