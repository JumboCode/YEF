import React from 'react';
import ReactDOM from 'react-dom';
import BallotEnterResults from '../modules/BallotEnterResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BallotEnterResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});
