import Home from "../components/Home/Home";
import {connect} from 'react-redux';
import userActions from "../actions/userActions";

const mapStateToProps = (state) => {
  return {
    showLogin:state.homePage.showLogin,
    isLoggedIn:state.homePage.isLoggedIn,
    hasError:state.homePage.hasError,
    errorMessage:state.homePage.errorMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return ({
    loginTeam: (name, password) => dispatch(userActions.loginTeam(name, password)),
    addUser: (name, email, password) => dispatch(userActions.addUser(name, email, password)),
    toggleLogin: () => dispatch(userActions.toggleLogin()),
    checkLoggedIn: () => userActions.checkLoggedIn(),
    displayError: (errorMessage) => dispatch(userActions.displayError(errorMessage))
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
