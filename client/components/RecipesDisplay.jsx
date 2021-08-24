import React from 'react';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList }) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];
  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <h3 key={`recipe-${i}`}>
        {recipeList[i]}
      </h3>,
    );
  }

  return (
    <div className="recipesDisplay">
      <h4>Recipes</h4>
      {recipes}
    </div>
  );
};

export default RecipesDisplay;
