import React from 'react';
import Container from './Container'

class UserPage extends React.Component {
  constructor(props) {
    super(props),
      this.signOutTeam = this.signOutTeam.bind(this)
  }

  signOutTeam() {
    this.props.signOutUser(this.props.email);
    window.location.href = "/home"
  }

  render() {
    const { activeElement, addNewTeam, userId, teams, getTeamsOfUser, newTeam} = this.props;
    return (
      <div >
        <button id="signOut" onClick={this.signOutTeam}>Sign Out<i class="fa fa-sign-out signout-icon" aria-hidden="true"></i></button>
        <Container activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} teams={teams} getTeamsOfUser={getTeamsOfUser} newTeam={newTeam}/>
      </div>
    )
  }
}

export default UserPage;

