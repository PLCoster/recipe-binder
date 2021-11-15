import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import RecipeCreator from './RecipeCreator';
import RecipeDisplay from './RecipeDisplay';
import NotFound from './NotFound';

const App = () => (
  <Router>
    <div>
      <Navbar />
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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
