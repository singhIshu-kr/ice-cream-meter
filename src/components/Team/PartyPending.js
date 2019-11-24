import React from 'react';

class PartyPending extends React.Component{
  renderForGuest(){
    const { pendingList} = this.props;
    return(
      <div className="partyPending primary">
        <h2>Pending Party</h2>
        <div className="partyPendingList">
          <ul>
            {
              pendingList.map(member => (
                <li key={member.id}>
                  <span id="memberName" className="memberName">{member.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }

  renderForAdmin(){
    const { pendingList, resetScore } = this.props;
    return(
      <div className="partyPending primary">
        <h2>Pending Party</h2>
        <div className="partyPendingList">
          <ul>
            {
              pendingList.map(member => (
                <li key={member.id}>
                  <span id="memberName" className="memberName">{member.name}</span>
                  <button className="resetScore" id="resetScore" onClick={() =>  resetScore(member.id, member.teamID)}>Reset</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }

  render(){
    const { userType } = this.props; 
    return userType === "GUEST" ? this.renderForGuest() : this.renderForAdmin();
  }
}

export default PartyPending;
