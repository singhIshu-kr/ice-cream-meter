import React from 'react';
import { Redirect } from 'react-router-dom';

class ShowTeamForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    const {email,password} = this.state;
    this.checkEmptyField(email,password) && this.props.loginTeam(email,password);
  }

  checkEmptyField(email,password){
    return (email && password) ? this.validateEmail(email) : alert("No field should be empty");
  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("Invalid email format");
    return (false)
  }

  render() {
    const { isLoggedIn, invalidCredentials } = this.props;
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/team', state: { teamId: this.state.email } }} />
    }
    return (
      <div>
        {invalidCredentials && <p className="invalid-credentials">Invalid Credentials!</p>}
        <label >
          <div >
            <input type="text" id="teamName" placeholder="Team Email" value={this.state.email} onChange={this.handleChange} required />
            <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.setPassword} required />
            <input id="submit" type="submit" value="Go to Team" onClick={this.handleSubmit} />
          </div>
        </label>
      </div>
    );
  }
}

export default ShowTeamForm;