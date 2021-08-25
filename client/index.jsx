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
// Import styles
import styles from './scss/application.scss';

// Import React Components
import App from './components/App.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'
import RecipeDisplay from './components/RecipeDisplay.jsx'

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
        <button type="button" className="btn btn-primary">TEST!</button>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/addRecipe">
          <RecipeCreator />
        </Route>
        <Route path="/recipe/:id">
          <RecipeDisplay />
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
