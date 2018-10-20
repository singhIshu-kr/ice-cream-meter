import React from 'react'
import NewTeam from './NewTeam'


class Container extends React.Component {
  componentWillMount(){
    const { getTeamsOfUser, userId,teams} = this.props;
    getTeamsOfUser(userId);
  }

  render(){
    const {activeElement, addNewTeam, userId, teams} = this.props;
    return(
      <div>
        <NewTeam activeElement={activeElement} addNewTeam={addNewTeam} userId={userId} />
        {
          teams.map((team)=>{
            return (
              <h3>{team.teamId}</h3>
            )
          })
        }
      </div>
    )
  }
}

export default Container;
