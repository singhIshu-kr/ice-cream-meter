import React from 'react';
import Login from './LoginUser';
import AddUser from './AddUser';
import { Redirect } from 'react-router-dom';

class HomePage extends React.Component {

  componentWillMount(){
    const {checkLoggedIn} = this.props;
    checkLoggedIn();
  }

  showLoginOrSignUp(){
    const { addUser, toggleLogin, showLogin, isLoggedIn, loginTeam, hasError, errorMessage, displayError} = this.props;
    if(showLogin){
      return (
        <div className="formContainer">
        {this.props.isLoggedIn && <Redirect to={{ pathname: '/team' }} />}
        <div class="form" >
            <div id="login"><Login loginTeam={loginTeam} isLoggedIn={isLoggedIn} hasError={hasError} errorMessage={errorMessage} displayError={displayError}/></div>
          <p>or</p>
          <a href onClick={(e) => toggleLogin()} id="teamLink">SignUp</a>
        </div>
        </div>
      )
    }

    return (
      <div className="formContainer">
      <div class="form" >
        <div id="addUser"><AddUser addUserAndPassword={addUser} isLoggedIn={isLoggedIn} /></div>
        <p>or</p>
        <a onClick={() => toggleLogin()} id="teamLink">Go to Login page</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div >
        {this.showLoginOrSignUp()}
      </div>
    )
  }
}

export default HomePage;
