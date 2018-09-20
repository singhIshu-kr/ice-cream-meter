import Home from "../components/Home/Home";
import { connect } from 'react-redux';
import {addTeam, toggleLogin, loginTeam, checkLoggedIn} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    showLogin:state.homePage.showLogin,
    isLoggedIn:state.homePage.isLoggedIn,
    invalidCredentials:state.homePage.invalidCredentials
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    loginTeam:(name,password) => loginTeam(dispatch,name,password),
    addTeam: (name,email,password) => addTeam(dispatch,name,email,password),
    toggleLogin:() =>  dispatch(toggleLogin()),
    checkLoggedIn:()=> checkLoggedIn(dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
