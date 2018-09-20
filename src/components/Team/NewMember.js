import React from 'react'

class NewMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',id:''};
    this.handleChange = this.handleChange.bind(this);
    this.setId = this.setId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  setId(event) {
    this.setState({ id: event.target.value });
  }

  clearInputs(){
    this.setState({ id: "" });
    this.setState({ value: "" });
  }

  handleSubmit() {
    if(this.state.value){
      console.log(this.props.teamId)
      this.props.onSubmit(this.state.value,this.props.teamId);
    }
    this.clearInputs()
  }
 
  render() {
    const {idInUse} = this.props;
    return (
      <div className="addMember">
        {idInUse && <p className="invalid-credentials">Id should be unique</p>}
          <label>
          <input type="text" id="name" placeholder="Name" value={this.state.value} onChange={this.handleChange} />
          {/* <input type="text" id="id" placeholder="Employee ID" value={this.state.id} onChange={this.setId} /> */}
          <input id="submit" type="submit" className="primary" value="Add Member" onClick={this.handleSubmit}/>
        </label>
      </div>
    );
  }
}

export default NewMember;
