import React from 'react'

class TeamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  clearInputs() {
    this.setState({ value: "" });
  }

  submitForm(event) {
    if (event.key == "Enter") {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    if (this.state.value) {
      this.props.getSearchedTeam(this.state.value);
    }
    this.clearInputs()
  }
  
  hideMessage() {
    document.querySelector('.searchedTeamcontainer').style.display = 'none';
  }

  render() {
    const { searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, userId } = this.props;
    const placeholderText = invalidName ? "Invalid team name" : "Team name"
    return (
      <div className={"teamSearch"}>
        <input className={"name"} placeholder={placeholderText} value={this.state.value} onChange={this.handleChange}
          onKeyPress={(event) => this.submitForm(event)} />
        <i className={"fa fa-search"} onClick={this.handleSubmit} />
        {searchedTeam && 
          <div className={"searchedTeamcontainer"}>
            {searchedTeam}<i className="fa fa-caret-right"/>
            {searchedTeam && 
            <button type="button" className={"submitButton"} onClick={() => requestAccess(userId, searchedTeam)}>Request Access</button>}
            </div>
          }
        {invalidName && <div className={"searchedTeamcontainer"} onClick={()=>this.hideMessage()}>{errorMessage}</div>}
        {infoMessage && <div className={"searchedTeamcontainer"} onClick={()=>this.hideMessage()}>{infoMessage}</div>}
      </div>
    )
  };
}

export default TeamSearch;
