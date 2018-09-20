const meterUpdater = (state = { team: [], idInUse: false, teamName: null}, action) => {
  switch (action.type) {
    case 'SET_TEAM':
    console.log(action);
      return {
        ...state,
        idInUse:false,
        team: action.payload.memberInfo,
        teamName:action.payload.name
      }
    
    case 'SIGNOUT_TEAM':
      return {
        ...state,
        email:undefined
    }

    case 'ID_IN_USE':
      return {
        ...state,
        idInUse:true
      }

    default:
      return state
  }
}

export default meterUpdater;
