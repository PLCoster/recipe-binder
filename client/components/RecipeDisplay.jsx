import React, { useEffect, useState } from 'react';
import { useParams, Redirect} from 'react-router-dom';

// Basic functional class (needs state to work properly) -> Use React Hooks
const RecipeDisplay = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeFetched, setRecipeFetched] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

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
      .catch(((err) => console.log(err)));
  };

  const deleteRecipe = () => {
    console.log('Trying to delete recipe from DB');

    fetch('/api/recipe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to add recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        // Reroute to main recipes when successfully deleted
        console.log('Deleted recipe: ', recipeObj._id);
        if (recipeObj._id) {
          setRedirectTo('/');
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

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
    <section id="recipe-details">
      <h3 className="mb-1">{recipeDetails.title}</h3>
      <p className="small mb-3">
        {recipeDetails.privateRecipe ? 'Private Recipe' : 'Public Recipe'}
      </p>

      <h5 className="mb-3">{recipeDetails.description}</h5>

      <h6 className="row mb-3">

        <span className="col-md-4 col-sm-12">
          Prep. Time:
          {` ${recipeDetails.prepTime} mins`}
        </span>

        <span className="col-4">
          Cooking Time:
          {` ${recipeDetails.cookTime} mins`}
        </span>

        <span className="col-4">
          Servings:
          {` ${recipeDetails.numServings}`}
        </span>

      </h6>

      <h5>Ingredients: </h5>
      <ul>
        {recipeDetails.ingredients.split('\n').map((ing) => <li>{ing}</li>)}
      </ul>

      <h5>Instructions: </h5>
      <ol>
        {recipeDetails.instructions.split('\n').map((ing) => <li>{ing}</li>)}
      </ol>

      <p className="small">
        Recipe Id:
        {id}
      </p>

      <div className="flex flex-between">
        <button type="button" className="btn btn-sm btn-info">Update Recipe</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={deleteRecipe}>Delete Recipe</button>
      </div>

    </section>
  );
};

export default RecipeDisplay;
