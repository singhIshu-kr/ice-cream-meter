import React from 'react';
import { Redirect } from 'react-router-dom';

class AddTeamForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { value: '',password:'',email:'' };
    this.handleChange = this.handleChange.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(){
    const {email,password,value} = this.state;
    this.checkEmptyField(email,password,value) && this.props.addTeamAndPassword(value, email, password)
  }

  checkEmptyField(email, password, value) {
    return (email && password && value) ? this.validateEmail(email) : alert("No field should be empty");
  }

  validateEmail(mail) {
    console.log(mail)
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("Invalid email format");
    return (false)
  }

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/team', state: { teamId: this.state.email } }} />
    }
    return (
      <div>
        <div>
          <input type="text" id="teamName" placeholder="Team Name" value={this.state.value} onChange={this.handleChange} />
            <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.setEmail} required/>
          <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.setPassword}  />
          <input id="submit" type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default AddTeamForm;
