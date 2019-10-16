import React from 'react';
import { Redirect } from 'react-router-dom';

class AddUser extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { value: '',password:'',email:'' };
    this.handleChange = this.handleChange.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  submitForm(event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  }

  handleSubmit(){
    const {email,password,value} = this.state;
    this.checkEmptyField(email,password,value) && this.props.addUserAndPassword(value, email, password)
  }

  checkEmptyField(email, password, value) {
    if (email && password && value) {
      return this.validateEmail(email)
    }
    this.props.displayError("No fields should be empty")
    return false;
  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    this.props.displayError("Invalid email format")
    return (false)
  }

  render() {
    const { isLoggedIn, hasError, errorMessage} = this.props;
    // console.log(this.props)
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/profile', state: { teamId: this.state.email } }} />
    }
    return (
      <div>
        {hasError && <p className="invalid-credentials">{errorMessage}</p>}
        <label>
        <div>
          <input type="text" id="userName" placeholder="User Name" value={this.state.value} onChange={this.handleChange} />
            <input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.setEmail} required/>
          <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} onKeyPress={(event)=>this.submitForm(event)}/>
          <input id="submit" type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
        </label>
      </div>
    );
  }
}

export default AddUser;
