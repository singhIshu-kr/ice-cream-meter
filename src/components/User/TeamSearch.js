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
    const { searchedTeam, invalidName} = this.props;
    return (
      <div className="addMember">
        <h3>{searchedTeam}</h3>
        {invalidName && <p className="invalid-credentials">Invalid Name!</p>}
        <label>
          <input type="text" id="name" placeholder="Team Name" value={this.state.value} onChange={this.handleChange} onKeyPress={(event) => this.submitForm(event)} />
          <input id="submit" type="submit" className="primary" value="Search for team" onClick={this.handleSubmit} />
        </label>
      </div>
    );
  }
}

export default TeamSearch;
