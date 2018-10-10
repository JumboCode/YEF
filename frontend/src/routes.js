import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import CreateTournament from "./modules/CreateTournament";

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createTournament" component={CreateTournament} />
        </Switch>
      </BrowserRouter>
    );
  }
}
