import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginTeamForm
 extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  submitForm(event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  }

  handleSubmit() {
    const {email,password} = this.state;
    console.log(this.checkEmptyField(email, password),"enkf,mdsafnkl")
    return this.checkEmptyField(email, password) && this.props.loginTeam(email,password);
  }

  checkEmptyField(email,password){
    if(email && password){
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
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/profile' }} />
    }
    return (
      <div>
        {hasError && <p className="invalid-credentials">{errorMessage}</p>}
        <label >
          <div >
            <input type="email" id="userName" placeholder="User Email" value={this.state.email} onChange={this.handleChange} required />
            <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} onKeyPress={(event)=>this.submitForm(event)}  required />
            <input id="submit" type="submit" value="Login" onClick={this.handleSubmit} />
          </div>
        </label>
      </div>
    );
  }
}

export default LoginTeamForm
;
