const updateUserPage = (state = { userId:"", activeElement: "team_list", teamCreated: false}, action) => {
  switch (action.type) {
    case 'TEAM_CREATED':
      return {
        ...state,
        teamCreated : true
      }

    default:
      return state
  }
}

export default updateUserPage;
