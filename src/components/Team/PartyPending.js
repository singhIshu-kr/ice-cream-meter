import React from 'react';

const PartyPending = ({pendingList, resetScore}) => {
  return(
  <div className="partyPending primary">
    <h2>Pending Party</h2>
    <div className="partyPendingList">
      <ul>
        {
          pendingList.map(member => (
            <li key={member.id}>
              <span id="memberName" className="memberName">{member.name}</span>
              <button className="resetScore" id="resetScore" onClick={()=>resetScore(member.id,member.teamID)}>Reset</button>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
)}

export default PartyPending;
