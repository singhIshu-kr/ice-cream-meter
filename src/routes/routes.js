import TeamBar from "../containers/ScoreUpdater";
import Home from "../containers/Home";
import UserPage from "../containers/UserPage"
import { Route, BrowserRouter} from "react-router-dom";
import React from "react";


export default () => {
  return (
      <BrowserRouter>
        <div>
        <Route exact path='/team' component={TeamBar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/profile' component={UserPage} />
        </div>
      </BrowserRouter>
  );
}
