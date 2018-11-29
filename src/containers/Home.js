import Home from "../components/Home/Home";
import { connect } from 'react-redux';
import {addUser, toggleLogin, loginTeam, checkLoggedIn, displayError} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    showLogin:state.homePage.showLogin,
    isLoggedIn:state.homePage.isLoggedIn,
    hasError:state.homePage.hasError,
    errorMessage:state.homePage.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    loginTeam:(name,password) => loginTeam(dispatch,name,password),
    addUser: (name,email,password) => addUser(dispatch,name,email,password),
    toggleLogin:() =>  dispatch(toggleLogin()),
    checkLoggedIn:()=> checkLoggedIn(dispatch),
    displayError:(errorMessage)=> dispatch(displayError(errorMessage))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
