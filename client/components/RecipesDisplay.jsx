import React from 'react';
import { Link } from 'react-router-dom';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList, addRecipe, deleteRecipe, updateFormVal, formVals}) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];
  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
        <div className="card">
          <div className="card-body">
            <h5
              key={`recipe-${recipeList[i]._id}`}
              className="card-title"
            >
              {recipeList[i].title}
            </h5>
            <h6 clasName="card-subtitle">
              Prep. Time:
              {recipeList[i].prepTime}
            </h6>
            <p className="card-text">
              {recipeList[i].description.length > 60 ? `${recipeList[i].description.slice(60)}...` : recipeList[i].description}
            </p>
            <Link to={`/recipe/${recipeList[i]._id}`}>
              <button className="card-link btn btn-sm btn-primary" type="button">View Recipe</button>
            </Link>

            <button
              type="submit"
              onClick={() => deleteRecipe(recipeList[i]._id)}
            >
              Delete This Recipe
            </button>
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div className="recipesDisplay">
      <h3> All Recipes: </h3>
      <div className="row">
        {recipes}
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