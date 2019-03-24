import React from 'react';
import * as ReactDOM from 'react-dom';
import DateFormatter from './DateFormatter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const now = new Date().toDateString();
  ReactDOM.render(<DateFormatter format="dafault">{now}</DateFormatter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
