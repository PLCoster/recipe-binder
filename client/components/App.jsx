import React, { Component } from 'react';
import RecipesDisplay from './RecipesDisplay.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.initialFormVals = {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      numServings: '',
      privateRecipe: true,
    };

    this.state = {
      test: 'hello',
      recipeList: [{ title: 'Recipe1' }, { title: 'Recipe2' }, { title: 'Recipe3' }, { title: 'Recipe4' }],
      formVals: { ...this.initialFormVals },
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.updateFormVal = this.updateFormVal.bind(this);
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
    console.log('Trying to add a new recipe to DB', this.state.formVals);

    fetch('/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formVals),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to add recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        // Clear input and add new recipe to RecipeList
        const newRecipeList = this.state.recipeList.slice();
        newRecipeList.push(recipeObj);
        this.setState({
          recipeList: newRecipeList,
          formVals: { ...this.initialFormVals },
        });
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

  // Updates form values in state as they are changed
  updateFormVal(value, key) {
    console.log('Updating form values: ', key, value);
    this.setState({formVals: {...this.state.formVals, [key]: value}});
  }

  render() {
    const { test, recipeList, formVals } = this.state;

    return (
      <div>
        <h1>This is your App!</h1>
        <h2>
          {test}
        </h2>
        <RecipesDisplay
          recipeList={recipeList}
          addRecipe={this.addRecipe}
          deleteRecipe={this.deleteRecipe}
          updateFormVal={this.updateFormVal}
          formVals={formVals}
        />
      </div>
    );
  }
}

export default App;
