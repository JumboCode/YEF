import React from 'react';
import ReactDOM from 'react-dom';
import CreateTournament from '../modules/CreateTournament';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateTournament />, div);
});
