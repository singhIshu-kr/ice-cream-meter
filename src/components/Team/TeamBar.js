import React from 'react';
import MemberRow from './MemberRow'
import NewMember from './NewMember';
import PartyPending from './PartyPending';
import { Redirect } from 'react-router-dom';

class TeamBar extends React.Component {
  constructor(props) {
    super(props),
      this.signOutTeam = this.signOutTeam.bind(this)
  }

  getPartyPendingList(memberList) {
    return memberList.filter((member) => {
      return member.score >= 5;
    })
  }

  componentDidMount() {
    const { fetchTeamInfo, email } = this.props;
    email && fetchTeamInfo(email);
  }

  signOutTeam() {
    this.props.signOutTeam(this.props.email);
    window.location.href = "/home"
  }

  render() {
    const { teamInfo, addScore, addMember, removeMember, decreaseScore, resetScore, email, nameInUse, teamName } = this.props;
    if (!email) {
      return <Redirect to={{ pathname: '/home' }} />
    }
    return (
      <div>
        <h1 className="appHeader teamName">{teamName}</h1>
        <NewMember onSubmit={addMember} teamId={email} nameInUse={nameInUse} />
        <button id="signOut" onClick={this.signOutTeam}>Sign Out<i class="fa fa-sign-out signout-icon" aria-hidden="true"></i></button>
        <div className="container">
          <PartyPending pendingList={this.getPartyPendingList(teamInfo) || []} resetScore={resetScore} />
          <div className="teamMembersData">
            <div className="membersBlock">
              {
                teamInfo.map((memberInfo, index) => {
                  return (
                    <MemberRow key={`member-${index}`}
                      memberInfo={memberInfo}
                      increaseScore={addScore}
                      decreaseScore={decreaseScore}
                      removeMember={removeMember}
                    />)
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TeamBar;
