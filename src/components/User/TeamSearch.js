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

  render() {
    const { searchedTeam, invalidName, errorMessage, requestAccess, infoMessage, userId } = this.props;
    const placeholderText = invalidName ? "Invalid team name" : "Team name"
    return (
      <div className={"teamSearch"}>
        <input className={"name"} placeholder={placeholderText} value={this.state.value} onChange={this.handleChange}
          onKeyPress={(event) => this.submitForm(event)} />
        <i className={"fa fa-search"} onClick={this.handleSubmit} />
        {searchedTeam && <ul id="myUL">
        <p id="searchedTeam">{searchedTeam}
            {searchedTeam && <button onClick={() => requestAccess(userId, searchedTeam)} id="submit">Request Access</button>}</p>
        </ul>}
        {invalidName ? <p className="invalid-credentials">{errorMessage}</p> : <p className="infoMessage">{infoMessage}</p>}
      </div>
    )
  };
}

export default TeamSearch;
