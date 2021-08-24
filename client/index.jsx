import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

render(
  <section>
    <h1> Is the react component rendering? </h1>
    <App />
  </section>, document.getElementById('root'),
);
