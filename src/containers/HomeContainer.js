import Home from "../components/Home/Home";
import {connect} from 'react-redux';
import appActions from "../actions/appActions";

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
    loginTeam: (name, password) => dispatch(appActions.loginTeam(name, password)),
    addUser: (name, email, password) => dispatch(appActions.addUser(name, email, password)),
    toggleLogin: () => dispatch(appActions.toggleLogin()),
    checkLoggedIn: () => appActions.checkLoggedIn(),
    displayError: (errorMessage) => dispatch(appActions.displayError(errorMessage))
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
