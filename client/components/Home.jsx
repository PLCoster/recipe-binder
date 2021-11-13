import React, { Component } from 'react';
import RecipesDisplay from './RecipesDisplay';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeList: [],
      fetched: false,
    };
  }

  componentDidMount() {
    // Get initial list of recipes:
    this.getRecipes();
  }

  // Function to get all recipes from DB via API call:
  getRecipes() {
    console.log('Trying to get Recipes, this.state: ', this.state);
    fetch('/api/', { redirect: 'follow' })
      .then((response) => {
        console.log(response.redirected);
        if (response.redirected) {
          console.log('REDIRECTING TO: ', response.url);
          window.location.href = response.url;
        }
        console.log('GET RECIPES RESPONSE: ', response);
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(
          'Error when trying to get recipes from api, status: ',
          response.status
        );
      })
      .then((recipeArr) => {
        console.log('Recipes Received: ', recipeArr);
        this.setState({ recipeList: recipeArr, fetched: true });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { recipeList, fetched } = this.state;

    return (
      <div>
        <RecipesDisplay recipeList={recipeList} fetched={fetched} />
      </div>
    );
  }
}

export default Home;
