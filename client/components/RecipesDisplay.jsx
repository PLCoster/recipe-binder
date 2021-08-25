import React from 'react';
import RecipeCreator from './RecipeCreator.jsx';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList, addRecipe, deleteRecipe, updateFormVal, formVals}) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];
  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <section>
        <h5 key={`recipe-${recipeList[i]._id}`}>
          {recipeList[i].title}
          <button
            type="submit"
            onClick={() => deleteRecipe(recipeList[i]._id)}
          >
            Delete This Recipe
          </button>
        </h5>
      </section>,
    );
  }

  return (
    <div className="recipesDisplay">
      <h3> All Recipes: </h3>
      {recipes}
    </div>
  );
};

export default RecipesDisplay;
