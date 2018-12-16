import React from 'react'
import { Redirect, Link } from 'react-router-dom';

class Container extends React.Component {
  componentWillMount() {
    const { getTeamsOfUser, userId } = this.props;
    getTeamsOfUser(userId);
  }

  render() {
    const { teams, newTeam } = this.props;
    if (newTeam) {
      return <Redirect to={{ pathname: `/team/${newTeam}}`, state: { teamId: newTeam } }} />
    }
    return (
      <div className={"teamsContainer"}>
        <header className={"teamsHeader"}>My teams</header>
        <div className={"myTeams"}>
          {teams.map((team) => {
              return (
                <div className={"team"}>
                  <Link to={{ pathname: `/team/${team.teamId}`, state: { teamId: team.teamId } }}>
                  <button>{team.teamId}</button>
                  </Link>
                </div>
              )})}
        </div>
      </div>
    )
  }
}

export default Container;
