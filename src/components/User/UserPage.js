import React from 'react';
import Container from './Container'

class UserPage extends React.Component {
  render() {
    const { activeElement, addNewTeam, userId, teams, getTeamsOfUser, teamCreated} = this.props;
    return (
      <div >
        <h1>Profile</h1>
        <Container activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} teams={teams} getTeamsOfUser={getTeamsOfUser} teamCreated={teamCreated}/>
      </div>
    )
  }
}

export default UserPage;

