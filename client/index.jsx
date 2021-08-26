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
import bootstrap from 'bootstrap';

// Import styles
import styles from './scss/application.scss';

// Import React Components
import App from './components/App.jsx';
import RecipeCreator from './components/RecipeCreator.jsx'
import RecipeDisplay from './components/RecipeDisplay.jsx'

render(
  <Router>
    <div>
      {/* {NAVBAR} */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        {/* {NAVBAR LEFT} */}
        <div className="container-fluid">
          <Link to="/">
            <button type="button" className="navbar-brand">paulRecipes</button>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/"><button type="button" className="nav-link">Home</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/addRecipe"><button type="button" className="nav-link">Create a New Recipe</button></Link>
              </li>
            </ul>

            {/* {NAVBAR RIGHT} */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <div className="container">
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
