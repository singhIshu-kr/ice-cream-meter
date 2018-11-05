import React from 'react'
import NewTeam from './NewTeam'
import { Redirect, Link } from 'react-router-dom';

class Container extends React.Component {
  componentWillMount() {
    const { getTeamsOfUser, userId } = this.props;
    getTeamsOfUser(userId);
  }

  render() {
    const { activeElement, addNewTeam, userId, teams, newTeam } = this.props;
    if (newTeam) {
      return <Redirect to={{ pathname: `/team/${newTeam}}`, state: { teamId: newTeam } }} />
    }
    return (
      <div>
        <NewTeam activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} />
        <table>
          {
            teams.map((team) => {
              return (
                <ol>
                  <Link to={{ pathname: `/team/${team.teamId}`, state: { teamId: team.teamId } }}>{team.teamId}</Link>
                </ol>
              )
            })
          }
        </table>
      </div>
    )
  }
}

export default Container;
