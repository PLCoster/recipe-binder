import React, { Component } from 'react';
import RecipesDisplay from './RecipesDisplay.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hello',
      recipeList: ['Recipe1', 'Recipe2', 'Recipe3', 'Recipe4'],
    };
    this.addRecipe = this.addRecipe.bind(this);
  }

  // Test function to add recipe to recipeList
  addRecipe() {
    const newRecipes = this.state.recipeList.slice();
    newRecipes.push('NEW RECIPE ADDED!');
    this.setState({ recipeList: newRecipes });
  }

  render() {
    const { test, recipeList } = this.state;

    return (
      <div>
        <h1>This is your App!</h1>
        <h2>
          {test}
        </h2>
        <RecipesDisplay recipeList={recipeList} addRecipe={this.addRecipe} />
      </div>
    );
  }
}

export default App;
