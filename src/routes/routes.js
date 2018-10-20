import TeamBar from "../containers/ScoreUpdater";
import Home from "../containers/Home";
import Profile from "../components/Profile/Profile"
import { Route, BrowserRouter, Redirect} from "react-router-dom";
import React from "react";
import cookie from "react-cookies";


export default () => {
  return (
      <BrowserRouter>
        <div>
        <Route exact path='/team' component={TeamBar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/profile' component={Profile} />
        </div>
      </BrowserRouter>
  );
}
