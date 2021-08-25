import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import App from './components/App.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'

render(
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addRecipe">Add a Recipe</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/addRecipe">
          <h1>THIS IS THE ABOUT PAGE</h1>
          <RecipeCreator />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root'),
);

// render(
//   <section>
//     <h1> Is the react component rendering? </h1>
//     <App />
//   </section>, document.getElementById('root'),
// );
