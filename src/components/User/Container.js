import React from 'react'
import NewTeam from './NewTeam'
import { Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';

class Container extends React.Component {
  componentWillMount(){
    const { getTeamsOfUser, userId} = this.props;
    getTeamsOfUser(userId);
  }

  render(){
    const {activeElement, addNewTeam, userId, teams,teamCreated} = this.props;
    if(teamCreated){
      return <Redirect to={{ pathname: `/team/${cookie.load("teamId")}` }} />
    }
    return(
      <div>
        <NewTeam activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} />
        {
          teams.map((team)=>{
            return (
              <p><Link to={`/team/${team.teamId}`}>{team.teamId}</Link></p>
            )
          })
        }
      </div>
    )
  }
}

export default Container;
