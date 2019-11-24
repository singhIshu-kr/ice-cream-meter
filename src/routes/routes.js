import TeamBar from "../containers/TeamContainer";
import Home from "../containers/HomeContainer";
import UserPage from "../containers/UserPage"
import {BrowserRouter, Route} from "react-router-dom";
import React from "react";


export default () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path='/team/:teamName' component={TeamBar}/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/profile' component={UserPage}/>
            </div>
        </BrowserRouter>
    );
}
