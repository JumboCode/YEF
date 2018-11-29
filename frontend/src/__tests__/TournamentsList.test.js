import React from 'react';
import ReactDOM from 'react-dom';
import TournamentsList from '../modules/TournamentsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TournamentsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
