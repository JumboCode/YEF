import React from 'react';
import ReactDOM from 'react-dom';
import TournamentView from '../modules/TournamentView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TournamentView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
