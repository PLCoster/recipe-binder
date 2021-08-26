import React from 'react';
import { Link } from 'react-router-dom';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList, addRecipe, deleteRecipe, updateFormVal, formVals}) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];
  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <div class="col-sm-6">
        <div className="card">
          <h5 key={`recipe-${recipeList[i]._id}`}>
            {recipeList[i].title}
            <Link to={`/recipe/${recipeList[i]._id}`}>
              <button type="button">View Recipe</button>
            </Link>
            <button
              type="submit"
              onClick={() => deleteRecipe(recipeList[i]._id)}
            >
              Delete This Recipe
            </button>
          </h5>
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