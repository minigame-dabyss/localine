import React from "react";
import {MessagesContainer} from "./containers/messages";
import {gRPCClients} from "./gRPCClients";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/users/:name/group"
                       render={() => <MessagesContainer clients={gRPCClients} isGroup={true}/>}/>
                <Route exact path="/users/:name/room"
                       render={() => <MessagesContainer clients={gRPCClients} isGroup={false}/>}/>
            </Switch>

        </Router>
    );
};