import TeamBar from "../containers/ScoreUpdater";
import Home from "../containers/Home";
import { Route, BrowserRouter, Redirect} from "react-router-dom";
import React from "react";
import cookie from "react-cookies";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const email = cookie.load("email");
  return(
    <Route {...rest} render={(props) => (
      email=== undefined
        ? <Component {...props} />
        : <Redirect to='/home' />
    )} />
  )
}

export default () => {
  return (
      <BrowserRouter>
        <div>
        <Route exact path='/team' component={TeamBar} />
        <Route exact path='/home' component={Home} />
        {/* <PrivateRoute path='/team' component={TeamBar}/> */}
        </div>
      </BrowserRouter>
  );
}
