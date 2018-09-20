import React from 'react';
import Login from './ShowTeam';
import AddTeam from './AddTeam';
import { Redirect } from 'react-router-dom';

class HomePage extends React.Component {

  componentWillMount(){
    const {checkLoggedIn} = this.props;
    console.log(this.props.isLoggedIn)
    checkLoggedIn();
  }

  showLoginOrSignUp(){
    const { addTeam, toggleLogin, showLogin, isLoggedIn, loginTeam, invalidCredentials} = this.props;
    if(showLogin){
      return (
        <div className="formContainer">
        {this.props.isLoggedIn && <Redirect to={{ pathname: '/team' }} />}
        <div class="form" >
          <div id="login"><Login loginTeam={loginTeam} isLoggedIn={isLoggedIn} invalidCredentials={invalidCredentials}/></div>
          <a href onClick={(e) => toggleLogin()} id="teamLink">Don't have an account?</a>
        </div>
        </div>
      )
    }

    return (     
      <div className="formContainer">
      <div class="form" >
        <div id="addTeam"><AddTeam addTeamAndPassword={addTeam} isLoggedIn={isLoggedIn} /></div>
        <a onClick={() => toggleLogin()} id="teamLink">Go to show team page</a>
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
