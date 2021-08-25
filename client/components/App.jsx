import React, { Component } from 'react';
import RecipesDisplay from './RecipesDisplay.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeList: [],
    };

    this.deleteRecipe = this.deleteRecipe.bind(this);
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

  deleteRecipe(recipeId) {
    console.log('Trying to delete recipe from DB');

    fetch('/api/recipe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: recipeId }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to add recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        // Update Recipes since one has been deleted
        this.getRecipes();
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { recipeList, formVals } = this.state;

    return (
      <div>
        <h1>This is your App!</h1>
        <RecipesDisplay
          recipeList={recipeList}
          deleteRecipe={this.deleteRecipe}
        />
      </div>
    );
  }
}

export default App;
