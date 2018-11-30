import React from 'react'

class TeamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
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
      document.getElementById("submit").click();
    }
  }

  handleSubmit() {
    if (this.state.value) {
      this.props.getSearchedTeam(this.state.value);
    }
    this.clearInputs()
  }

  render() {
    const { searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, userId} = this.props;
    return (
      <div>
        <div className="searchedTeam">
          <h3 id="searchedTeam">{searchedTeam}</h3>
          {searchedTeam && <button onClick={() => requestAccess(userId, searchedTeam)} id="submit">Request Access</button>}
        </div>
        {invalidName ? <p className="invalid-credentials">{errorMessage}</p> : <p className="infoMessage">{infoMessage}</p>}
        <div className="teamSearch">
          <input type="text" id="name" placeholder="Team Name" value={this.state.value} onChange={this.handleChange} onKeyPress={(event) => this.submitForm(event)} />
          <input id="submit" type="submit" className="primary" value="Search for team" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default TeamSearch;
