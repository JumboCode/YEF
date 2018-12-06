import React from 'react';
import ReactDOM from 'react-dom';
import AddTeam from '../modules/AddTeam';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTeam />, div);
});
