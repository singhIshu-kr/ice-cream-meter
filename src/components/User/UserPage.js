import React from 'react';
import Container from './Container'
import TeamSearch from './TeamSearch'
import AccessRequests from './AccessRequests'
import NewTeam from "./NewTeam";

class UserPage extends React.Component {
  constructor(props) {
    super(props),
      this.signOutTeam = this.signOutTeam.bind(this)
  }

  signOutTeam() {
    this.props.signOutUser(this.props.email);
    window.location.href = "/home"
  }

  handleNotification() {
    const notificationElement = document.querySelector('.newNotification');
    if (notificationElement)
      notificationElement.className = 'notificationsContainer';
    this.showPopup("notificationPopup");
  }

  hidePopup(classname) {
    document.querySelector(`.${classname}`).style.visibility = "hidden";
  }

  showPopup(classname) {
    document.querySelector(`.${classname}`).style.visibility = "visible";
  }

  notificationPopup() {
    const { requests, getAccessRequests, userId, permitAccess} = this.props;
    return (
      <div className={"overlay notificationPopup"}
           onClick={(event) => event.target.className === 'overlay' && this.hidePopup("notificationPopup")}>
        <div className={"popupContainer"}>
          <header className={"title"}>Notifications</header>
          <AccessRequests requests={requests}
            getAccessRequests={getAccessRequests}
            userId={userId}
            permitAccess={permitAccess} />
          <button className={"cancel"} onClick={() => this.hidePopup("notificationPopup")}>Cancel</button>
        </div>
      </div>
    )
  }

  newTeamPopup() {
    return (
      <div className={"overlay newTeamPopup"}
           onClick={(event) => event.target.className === 'overlay' && this.hidePopup("newTeamPopup")}>
        <div className={"popupContainer"}>
          <header className={"title"}>Add new team</header>
          <NewTeam activeElement={this.props.activeElement}
                   addNewTeam={this.props.addNewTeam}
                   userId={this.props.userId}/>
          <button className={"cancel"} onClick={() => this.hidePopup("newTeamPopup")}>Cancel</button>
        </div>
      </div>)
  }

  componentDidMount() {
    const {getTeamsOfUser} = this.props;
    getTeamsOfUser();
  }

  render() {
    const {activeElement, addNewTeam, userId, teams, getTeamsOfUser, newTeam, getSearchedTeam, searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, requests} = this.props;
    const notificationClassName = requests.length > 0 
      ? "notificationsContainer newNotification" 
      : "notificationsContainer";
    return (
      <div className="homePage">
        <h1 className="teamName">{"Hi, " + userId.split("@")[0]}</h1>
        <div className={"secondaryHeader"}>
          <div className={"searchTeam"}>
            <TeamSearch getSearchedTeam={getSearchedTeam} searchedTeam={searchedTeam} invalidName={invalidName}
                        errorMessage={errorMessage} requestAccess={requestAccess} infoMessage={infoMessage}
                        userId={userId}/>
          </div>
          <div className={"addNewTeamContainer"} onClick={() => this.showPopup("newTeamPopup")}>
            <i className="fa fa-users"/>&nbsp;Add a team
          </div>
          <div className={notificationClassName} onClick={() => this.handleNotification()}>
            <i className="fa fa-bell-o"/>&nbsp;Notifications
          </div>
          <div className={"signoutContainer"} onClick={this.signOutTeam}>
            <i className="fa fa-sign-out"/>&nbsp;Sign out
          </div>
        </div>
        <Container activeElement={activeElement}
                   addNewTeam={addNewTeam}
                   userId={userId} teams={teams}
                   getTeamsOfUser={getTeamsOfUser}
                   newTeam={newTeam}/>
        {this.newTeamPopup()}
        {this.notificationPopup()}
      </div>
    )
  }
}

export default UserPage;

