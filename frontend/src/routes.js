import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import CreateTournament from './modules/CreateTournament';
import TournamentsList from './modules/TournamentsList';
import BallotEnterResults from './modules/BallotEnterResults';

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createTournament" component={CreateTournament} />
          <Route path="/tournaments" component={TournamentsList} />
          <Route path="/enterResults" component={BallotEnterResults} />
        </Switch>
      </BrowserRouter>
    );
  }
}
