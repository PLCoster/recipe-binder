import React from 'react';
import { Link } from 'react-router-dom';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList, fetched}) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];

  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <div key={`${recipeList[i]._id}`} className="col-sm-6 col-md-4 col-lg-3 mt-3">
        <div className="card">
          <div className="card-body">
            <div>
              {recipeList[i].image
                ? (
                  <img
                    src={`/public/uploads${recipeList[i].image}`}
                    className="card-img-top"
                    alt="Recipe"
                  />
                )
                : undefined}
              <h5
                className="card-title"
              >
                {recipeList[i].title}
              </h5>
              <h6 className="card-subtitle small">
                Prep. Time:
                {recipeList[i].prepTime}
              </h6>
              <p className="card-text small mt-2">
                {recipeList[i].description.length > 60 ? `${recipeList[i].description.slice(0, 60)}...` : recipeList[i].description}
              </p>
            </div>
            <div className="mt-3">
              <Link to={`/recipe/${recipeList[i]._id}`}>
                <button className="card-link btn btn-sm btn-primary" type="button">View Recipe</button>
              </Link>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (!fetched) {
    return (
      <div className="recipesDisplay">
        <h3>Your Recipes: </h3>
        <div className="row">
          Loading recipes...
        </div>
      </div>
    );
  }

  return (
    <div className="recipesDisplay">
      <h3>Your Recipes: </h3>
      <div className="row">
        {recipes.length ? recipes : 'No recipes yet! Try adding some!'}
      </div>
    </div>
  );
};

export default RecipesDisplay;

// Old recipe format
// recipes.push(
//   <section>
//     <h5 key={`recipe-${recipeList[i]._id}`}>
//       {recipeList[i].title}
//       <Link to={`/recipe/${recipeList[i]._id}`}>
//         <button type="button">View Recipe</button>
//       </Link>
//       <button
//         type="submit"
//         onClick={() => deleteRecipe(recipeList[i]._id)}
//       >
//         Delete This Recipe
//       </button>
//     </h5>
//   </section>,
// );