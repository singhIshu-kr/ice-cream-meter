const meterUpdater = (state = { team: [], teamID: "", nameInUse: false, teamName: null, userType: undefined}, action) => {
  switch (action.type) {
    case 'SET_TEAM':
      return {
        ...state,
        nameInUse:false,
        team: action.payload.memberInfo,
        teamName:action.payload.name,
        userType:action.payload.userType
      }
    
    case 'SIGNOUT_TEAM':
      return {
        ...state,
        email:undefined
    }

    case 'NAME_IN_USE':
      return {
        ...state,
        nameInUse:true
      }

    default:
      return state
  }
}

export default meterUpdater;
