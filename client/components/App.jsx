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
    console.log('Trying to add a new recipe to DB');

    fetch('/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: 'Added Recipe via client'}),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to add recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        const newRecipeList = this.state.recipeList.slice();
        newRecipeList.push(recipeObj);
        this.setState({ recipeList: newRecipeList });
      })
      .catch((error) => console.error(error));
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
