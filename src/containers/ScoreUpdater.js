import TeamBar from '../components/Team/TeamBar';
import { connect } from 'react-redux';
import teamActions from "../actions/teamActions";

const mapStateToProps = (state) => {
  return ({
    teamInfo: state.meterUpdaters.teamInfo,
    teamId: state.meterUpdaters.teamId,
    nameInUse: state.meterUpdaters.nameInUse,
    teamName: state.meterUpdaters.teamName,
    userType: state.meterUpdaters.userType
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchTeamInfo: (teamId) => dispatch(teamActions.fetchTeamInfo(teamId)),
    addScore: (id, teamId) => dispatch(teamActions.addScore(id, teamId)),
    decreaseScore: (id, teamId) => dispatch(teamActions.decreaseScore(id, teamId)),
    addMember: (name, teamId) => dispatch(teamActions.addMember(name, teamId)),
    removeMember: (id, teamId) => dispatch(teamActions.removeMember(id, teamId)),
    resetScore: (id, teamId) => dispatch(teamActions.removeMember(id, teamId)),
    signOutTeam: (id) => dispatch(teamActions.removeMember(id))
  })
};

export default connect(mapStateToProps,mapDispatchToProps)(TeamBar)


