import React, { Component } from 'react';
import RecipesDisplay from './RecipesDisplay.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hello',
      recipeList: ['Recipe1', 'Recipe2', 'Recipe3', 'Recipe4'],
    };
  }

  render() {
    const { test, recipeList } = this.state;

    return (
      <div>
        <h1>This is your App!</h1>
        <h2>
          {test}
        </h2>
        <RecipesDisplay recipeList={recipeList} />
      </div>
    );
  }
}

export default App;
