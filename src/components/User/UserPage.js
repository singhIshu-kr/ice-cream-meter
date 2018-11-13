import React from 'react';
import Container from './Container'
import TeamSearch from './TeamSearch'
import AccessRequests from './AccessRequests'

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
    const { activeElement, addNewTeam, userId, teams, getTeamsOfUser, newTeam, getSearchedTeam, searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, requests, getAccessRequests} = this.props;
    return (
      <div >
        <button id="signOut" onClick={this.signOutTeam}>Sign Out<i class="fa fa-sign-out signout-icon" aria-hidden="true"></i></button>
        <TeamSearch getSearchedTeam={getSearchedTeam} searchedTeam={searchedTeam} invalidName={invalidName} errorMessage={errorMessage} requestAccess={requestAccess} infoMessage={infoMessage}/>
        <Container activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} teams={teams} getTeamsOfUser={getTeamsOfUser} newTeam={newTeam} />
        <AccessRequests requests={requests} getAccessRequests={getAccessRequests} userId={userId}/>
      </div>
    )
  }
}

export default UserPage;

