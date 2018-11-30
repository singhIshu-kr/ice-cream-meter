import React from 'react';
import Container from './Container'
import TeamSearch from './TeamSearch'
import AccessRequests from './AccessRequests'
// import IconButton from '@material-ui/core/IconButton';

class UserPage extends React.Component {
  constructor(props) {
    super(props),
      this.signOutTeam = this.signOutTeam.bind(this)
  }

  signOutTeam() {
    this.props.signOutUser(this.props.email);
    window.location.href = "/home"
  }

  componentDidMount() {
    const { getTeamsOfUser} = this.props;
    getTeamsOfUser();
  }

  render() {
    const { activeElement, addNewTeam, userId, teams, getTeamsOfUser, newTeam, getSearchedTeam, searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, requests, getAccessRequests, permitAccess} = this.props;
    return (
      <div className="homePage">
        <h1 className="teamName">{ "Hi, "+ userId.split("@")[0]}</h1>
        <button id="signOut" onClick={this.signOutTeam}>Sign Out<i class="fa fa-sign-out signout-icon" aria-hidden="true"></i></button>
        <TeamSearch getSearchedTeam={getSearchedTeam} searchedTeam={searchedTeam} invalidName={invalidName} errorMessage={errorMessage} requestAccess={requestAccess} infoMessage={infoMessage} userId={userId}/>
        <Container activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} teams={teams} getTeamsOfUser={getTeamsOfUser} newTeam={newTeam} />
        <AccessRequests requests={requests} getAccessRequests={getAccessRequests} userId={userId} permitAccess={permitAccess}/>
      </div>
    )
  }
}

export default UserPage;

