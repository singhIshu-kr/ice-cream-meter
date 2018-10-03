import React from 'react'

class NewMember extends React.Component {
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
    if (event.key == "Enter")  {
      document.getElementById("submit").click();
    }
  }

  handleSubmit() {
    if (this.state.value) {
      this.props.onSubmit(this.state.value, this.props.teamId);
    }
    this.clearInputs()
  }

  render() {
    const { nameInUse } = this.props;
    return (
      <div className="addMember">
        {nameInUse && <p className="invalid-credentials">Name should be unique</p>}
        <label>
          <input type="text" id="name" placeholder="Name" value={this.state.value} onChange={this.handleChange} onKeyPress={(event)=>this.submitForm(event)} />
          <input id="submit" type="submit" className="primary" value="Add Member" onClick={this.handleSubmit} />
        </label>
      </div>
    );
  }
}

export default NewMember;
