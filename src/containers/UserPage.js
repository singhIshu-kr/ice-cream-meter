import { connect } from "react-redux"
import UserPage from "../components/User/UserPage"
import {addNewTeam, getTeamsOfUser, signOutTeam, getSearchedTeam} from "../actions/index"
import cookie from 'react-cookies';

const mapStateToProps = (state) => {
  return {
    userId: cookie.load("email"),
    activeElement : state.userPage.activeElement,
    newTeam: state.userPage.newTeam,
    teams:state.userPage.teams,
    searchedTeam: state.userPage.searchedTeam
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addNewTeam : (userId, teamId) => addNewTeam(dispatch, userId, teamId),
    getTeamsOfUser :(userId) => getTeamsOfUser(dispatch, userId),
    signOutUser: (id) => signOutTeam(dispatch, id),
    getSearchedTeam: (id) => getSearchedTeam(dispatch, id)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage)
