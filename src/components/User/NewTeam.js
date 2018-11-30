import React from 'react'

class NewTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', id: '' };
    this.handleChange = this.handleChange.bind(this);
    this.setId = this.setId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  setId(event) {
    this.setState({ id: event.target.value });
  }

  clearInputs() {
    this.setState({ id: "" });
    this.setState({ value: "" });
  }

  submitForm(event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  }

  handleSubmit() {
    if (this.state.value) {
      this.props.addNewTeam(this.props.userId, this.state.value);
    }
    this.clearInputs()
  }

  render() {
    return (
      <div className="addMember">
        <label className="newMember"> 
          <input type="text" id="name" placeholder="Team Name" value={this.state.value} onChange={this.handleChange} onKeyPress={(event) => this.submitForm(event)} />
          <input id="submit" type="submit" className="primary" value="Add Team" onClick={this.handleSubmit} />
        </label>
      </div>
    );
  }
}

export default NewTeam;
