import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Basic functional class (needs state to work properly) -> Use React Hooks
const RecipeDisplay = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeFetched, setRecipeFetched] = useState(false);

  // Function that fetches recipe details from server
  const getRecipeDetails = () => {
    fetch(`/api/recipe/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to get recipe details, status: ', response.status);
      })
      .then(recipeObj => {
        console.log('Got recipe details: ', recipeObj);
        setRecipeDetails(recipeObj);
        setRecipeFetched(true);
      })
      .catch((err => console.log(err)));
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (!recipeFetched) {
    return (
      <h1>
        Loading Recipe with Id:
        {id}
      </h1>
    );
  }

  if (recipeFetched && !recipeDetails._id) {
    return <h1>Couldn&apos;t find recipe details, try again!</h1>;
  }

  return (
    <section>
      <h2>{recipeDetails.title}</h2>
      <h4>
        <span>
          Preparation Time:
          {recipeDetails.prepTime}
        </span>
        <span>
          Cooking Time:
          {recipeDetails.cookTime}
        </span>
        <span>
          Servings:
          {recipeDetails.numServings}
        </span>
        <span>
          {recipeDetails.privateRecipe ? 'Private Recipe' : 'Public Recipe'}
        </span>
      </h4>
      <h3>Ingredients: </h3>
      <ul>
        <li>{recipeDetails.ingredients}</li>
      </ul>
      <h3>Instructions: </h3>
      <ol>
        <li>{recipeDetails.instructions}</li>
      </ol>
      <h4>
        Recipe Id:
        {id}
      </h4>

    </section>
  );
};

export default RecipeDisplay;
