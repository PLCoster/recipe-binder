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

  componentDidMount() {
    // Get initial list of recipes:
    this.getRecipes();
  }

  // Function to get all recipes from DB via API call:
  getRecipes() {
    console.log('Trying to get Recipes, this.state: ', this.state);
    fetch('/api/')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to get recipes from api, status: ', response.status);
      })
      .then((recipeArr) => {
        console.log('Recipes Received: ', recipeArr);
        this.setState({ recipeList: recipeArr });
      })
      .catch((error) => console.error(error));
  }

  // Test function to add simple recipe to DB on button click:
  addRecipe() {
    const newRecipes = this.state.recipeList.slice();
    newRecipes.push({name: 'NEW RECIPE ADDED!'});
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
