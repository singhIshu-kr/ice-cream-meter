import React from 'react';
import MemberRow from './MemberRow'
import NewMember from './NewMember';
import PartyPending from './PartyPending';
import { Redirect, Link} from 'react-router-dom';

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
    const { fetchTeamInfo } = this.props;
    const { teamId } = this.props.location.state || this.props;
    teamId && fetchTeamInfo(teamId);
  }

  signOutTeam() {
    this.props.signOutTeam(this.props.email);
    window.location.href = "/home"
  }

  render() {
    const { teamInfo, addScore, addMember, removeMember, decreaseScore, resetScore, nameInUse, userType} = this.props;
    const { teamId } = this.props.location.state || this.props;
    if (!teamId) {
      return <Redirect to={{ pathname: '/home' }} />
    }
    return (
      <div>
        <Link to={{ pathname: '/profile' }}>Home</Link>
        <h1 className="appHeader teamName">{teamId}</h1>
        {userType !== "GUEST" && <NewMember onSubmit={addMember} teamId={teamId} nameInUse={nameInUse} />}
        <button id="signOut" onClick={this.signOutTeam}>Sign Out<i class="fa fa-sign-out signout-icon" aria-hidden="true"></i></button>
        <div className="container">
          <PartyPending pendingList={this.getPartyPendingList(teamInfo) || []} resetScore={resetScore} userType={userType}/>
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
                      userType={userType}
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
