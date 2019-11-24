import { connect } from "react-redux"
import UserPage from "../components/User/UserPage"
import { addNewTeam, getTeamsOfUser, signOutTeam, getSearchedTeam, requestAccess, getAccessRequests, permitAccess} from "../actions/userActions"
import cookie from 'react-cookies';

const mapStateToProps = (state) => {
  return {
    userId: cookie.load("email"),
    activeElement : state.userPage.activeElement,
    newTeam: state.userPage.newTeam,
    teams:state.userPage.teams,
    searchedTeam: state.userPage.searchedTeam,
    invalidName: state.userPage.invalidName,
    errorMessage: state.userPage.errorMessage,
    infoMessage: state.userPage.infoMessage,
    requests: state.userPage.requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addNewTeam : (userId, teamId) => addNewTeam(dispatch, userId, teamId),
    getTeamsOfUser :(userId) => getTeamsOfUser(dispatch, userId),
    signOutUser: (id) => signOutTeam(dispatch),
    getSearchedTeam: (id) => getSearchedTeam(dispatch, id),
    requestAccess:(userId, teamName) => requestAccess(dispatch, userId, teamName),
    getAccessRequests: (userId) => getAccessRequests(dispatch, userId),
    permitAccess: (userId, requestUser, teamName, role) => permitAccess(dispatch, userId, requestUser, teamName, role)
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage)
