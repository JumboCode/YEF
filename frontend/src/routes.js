import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import CreateTournament from './modules/CreateTournament';
import TournamentsListContainer from './modules/Containers/TournamentsListContainer.js';
import BallotEnterResults from './modules/BallotEnterResults';
import TournamentView from './modules/TournamentView';

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createTournament" component={CreateTournament} />
          <Route path="/tournament" component={TournamentView} />
          <Route path="/" component={TournamentsListContainer} />
          <Route path="/enterResults" component={BallotEnterResults} />
        </Switch>
      </BrowserRouter>
    );
  }
}
