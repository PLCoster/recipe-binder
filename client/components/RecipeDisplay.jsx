import React, { useEffect, useState } from 'react';
import { useParams, Redirect} from 'react-router-dom';
import Select from 'react-select';

// Displays Recipe Details, allows deletion and editing
const RecipeDisplay = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeFetched, setRecipeFetched] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');
  const [recipeUpdater, setRecipeUpdater] = useState(false);
  const [updaterDetails, setUpdaterDetails] = useState({});

  // Function that fetches recipe details from server
  const getRecipeDetails = () => {
    fetch(`/api/recipe/${id}`, { redirect: 'follow' })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to get recipe details, status: ', response.status);
      })
      .then(recipeObj => {
        console.log('Got recipe details: ', recipeObj);
        setRecipeDetails(recipeObj);
        setRecipeFetched(true);
        setUpdaterDetails(recipeObj);
      })
      .catch(((err) => console.log(err)));
  };

  // Function to delete recipe currently viewed from DB
  const deleteRecipe = () => {
    console.log('Trying to delete recipe from DB');

    fetch('/api/recipe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to delete recipe via api, status: ', response.status);
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

  // Function to send updated recipe to server for update on DB
  const updateRecipe = () => {
    console.log('Trying to update Recipe: ', updaterDetails);
    fetch('/api/recipe', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(updaterDetails),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to update recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        // Reroute to main recipes when successfully deleted
        console.log('Updated recipe: ', recipeObj._id);
        if (recipeObj._id) {
          setRedirectTo('/');
        }
      })
      .catch((error) => console.error(error));
  };

  // Function to switch mode from view to update
  const updateToggle = () => {
    setRecipeUpdater(!recipeUpdater);
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  if (redirectTo) {
    console.log('REDIRECTING TO: ', redirectTo);
    return <Redirect to={redirectTo} />;
  }

  // If waiting to fetch recipe show loading
  if (!recipeFetched) {
    return (
      <h1>
        Loading Recipe with Id:
        {id}
      </h1>
    );
  }

  // If fetch fails show error message
  if (recipeFetched && !recipeDetails._id) {
    return <h1>Couldn&apos;t find recipe details, try again!</h1>;
  }

  const { title,
    description,
    prepTime,
    cookTime,
    numServings,
    ingredients,
    instructions,
    privateRecipe,
  } = recipeDetails;

  // If not updating recipe then show recipe details view
  if (!recipeUpdater) {
    return (
      <section id="recipe-details">
        <h3 className="mb-1">{title}</h3>
        <p className="small mb-3">
          {privateRecipe ? 'Private Recipe' : 'Public Recipe'}
        </p>

        <h5 className="mb-3">{description}</h5>

        <h6 className="row mb-3">
          <span className="col-md-4 col-sm-12">
            Prep. Time:
            {` ${prepTime} mins`}
          </span>

          <span className="col-4">
            Cooking Time:
            {` ${cookTime} mins`}
          </span>

          <span className="col-4">
            Servings:
            {` ${numServings}`}
          </span>
        </h6>

        <h5>Ingredients: </h5>
        <ul>
          {ingredients.split('\n').map((ing) => <li>{ing}</li>)}
        </ul>

        <h5>Instructions: </h5>
        <ol>
          {instructions.split('\n').map((ing) => <li>{ing}</li>)}
        </ol>

        <p className="small">
          Recipe Id:
          {id}
        </p>

        <div className="flex flex-between">
          <button type="button" className="btn btn-sm btn-info" onClick={updateToggle}>Update Recipe</button>
          <button type="button" className="btn btn-sm btn-danger" onClick={deleteRecipe}>Delete Recipe</button>
        </div>

      </section>
    );
  }

  // If updating recipe, generate form view for update
  if (recipeUpdater) {
    return (
      <section>
        <h3>Update Your Recipe:</h3>
        <form onSubmit={(e) => {
          console.log('Trying to add recipe! Event is: ', e);
          e.preventDefault();
          updateRecipe();
        }}
        >
          <div className="mb-3 mt-3">
            <label
              htmlFor="newRecipeTitle"
              className="form-label"
            >
              Recipe Title:
            </label>
            <input
              type="text"
              id="newRecipeTitle"
              className="form-control"
              placeholder="Recipe Title"
              onChange={(e) => {
                setUpdaterDetails({ ...updaterDetails, title: e.target.value });
              }}
              defaultValue={title}
              name="title"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="newRecipeDescription"
              className="form-label"
            >
              Recipe Description:
            </label>
            <textarea
              id="newRecipeDescription"
              className="form-control"
              placeholder="Recipe Description"
              onChange={(e) => {
                setUpdaterDetails({ ...updaterDetails, description: e.target.value });
              }}
              defaultValue={description}
              name="description"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="newRecipeIngredients"
              className="form-label"
            >
              Recipe Ingredients:
            </label>
            <textarea
              id="newRecipeIngredients"
              className="form-control"
              placeholder="Recipe Ingredients"
              onChange={(e) => {
                setUpdaterDetails({ ...updaterDetails, ingredients: e.target.value });
              }}
              defaultValue={ingredients}
              name="ingredients"
              required
            />
            <div id="descriptionHelp" className="form-text">Write each ingredient on a separate line. Remember to include quantities!</div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="newRecipeInstructions"
              className="form-label"
            >
              Recipe Instructions:
            </label>
            <textarea
              id="newRecipeInstructions"
              className="form-control"
              placeholder="Recipe Instructions"
              onChange={(e) => {
                setUpdaterDetails({ ...updaterDetails, instructions: e.target.value });
              }}
              defaultValue={instructions}
              name="instructions"
              required
            />
            <div id="instructionHelp" className="form-text">Write each step on a separate line - no need to number steps.</div>
          </div>

          <div className="row mb-3">
            <label className="col-4"
                htmlFor="newRecipePrepTime"
              >
              Prep Time (mins):
            </label>

            <label className="col-4"
                htmlFor="newRecipeCookTime"
              >
              Cook Time (mins):
            </label>

            <label className="col-4"
                htmlFor="newRecipeServings"
              >
              Number of Servings:
            </label>
            <div className="col-4">
              <input
                id="newRecipePrepTime"
                className="form-control"
                type="number"
                onChange={(e) => {
                  setUpdaterDetails({ ...updaterDetails, prepTime: e.target.value });
                }}
                defaultValue={prepTime}
                name="prepTime"
                required
              />
            </div>

            <div className="col-4">
              <input
                id="newRecipeCookTime"
                className="form-control"
                type="number"
                onChange={(e) => {
                  setUpdaterDetails({ ...updaterDetails, cookTime: e.target.value });
                }}
                defaultValue={cookTime}
                name="cookTime"
                required
              />
            </div>

            <div className="col-4">
              <input
                id="newRecipeServings"
                className="form-control"
                type="number"
                onChange={(e) => {
                  setUpdaterDetails({ ...updaterDetails, numServings: e.target.value });
                }}
                defaultValue={numServings}
                name="numServings"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="newRecipePrivacy"
              className="form-label"
            >
              Choose Recipe Privacy:
            </label>
            <Select
              id="newRecipePrivacy"
              className="form-control"
              onChange={(e) => {
                console.log('Select Event: ', e);
                setUpdaterDetails({ ...updaterDetails, privateRecipe: e.value === 'true' });
              }}
              options={[{ label: 'Private', value: 'true' }, { label: 'Public', value: 'false' }]}
              defaultValue={privateRecipe
                ? { label: 'Private', value: 'true' }
                : { label: 'Public', value: 'false' }}
              name="privateRecipe"
            />
            <div id="privacyHelp" className="form-text">A private recipe can only be seen by you. Public recipes can be viewed by everyone!</div>
          </div>

          <button type="submit" className="btn btn-info">
            Update Recipe
          </button>

        </form>
      </section>
    );
  }

  // Should not be reachable:
  return <h1>SOMETHING WENT WRONG!</h1>;
};

export default RecipeDisplay;

// http://localhost:8080/recipe/6126fe22ac88b6c367921ffa
// http://localhost:8080/recipe/6126fe22ac88b6c367921ffa