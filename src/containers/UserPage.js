import { connect } from "react-redux"
import UserPage from "../components/User/UserPage"
import {addNewTeam, getTeamListOfUser} from "../actions/index"


const mapStateToProps = (state) => {
  return {
    activeElement : state.userPage.activeElement
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addNewTeam : (userId, teamId) => addNewTeam(dispatch, userId, teamId),
    // getTeamList : (userId) => getTeamListOfUser(dispatch, userId)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage)
