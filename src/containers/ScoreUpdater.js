import TeamBar from '../components/Team/TeamBar';
import { connect } from 'react-redux';
import { addScore, addMember,removeMember, decreaseScore,getSavedState,resetScore, signOutTeam} from '../actions/index';
import cookie from 'react-cookies';

const mapStateToProps = (state) => {
  return ({
    teamInfo: state.meterUpdaters.team,
    email: cookie.load("email"),
    idInUse: state.meterUpdaters.idInUse,
    teamName: state.meterUpdaters.teamName
  })
}


const mapDispatchToProps = dispatch =>({
  fetchTeamInfo : (teamId) => getSavedState(dispatch,teamId),
  addScore : (id,teamId)=>addScore(dispatch,id,teamId),
  decreaseScore: (id,teamId) => decreaseScore(dispatch,id,teamId),
  addMember : (name,teamId) => addMember(dispatch,name,teamId),
  removeMember : (id, teamId)=> removeMember(dispatch,id, teamId),
  resetScore : (id,teamId)=> resetScore(dispatch,id,teamId),
  signOutTeam : (id)=> signOutTeam(dispatch,id)
})

export default connect(mapStateToProps,mapDispatchToProps)(TeamBar)


