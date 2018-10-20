import { connect } from "react-redux"
import UserPage from "../components/User/UserPage"
import {addNewTeam} from "../actions/index"
import cookie from 'react-cookies';

const mapStateToProps = (state) => {
  return {
    userId: cookie.load("email"),
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
