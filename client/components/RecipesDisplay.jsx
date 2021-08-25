import React from 'react';

// React function component for displaying numerous recipe cards
const RecipesDisplay = ({ recipeList, addRecipe, deleteRecipe }) => {
  // Create recipe component for each recipe in props.recipes
  const recipes = [];
  console.log('RecipeList: ', recipeList);
  for (let i = 0; i < recipeList.length; i += 1) {
    recipes.push(
      <section>
        <h3 key={`recipe-${i}`}>
          {recipeList[i].name}
        </h3>
        <button type="submit" onClick={() => deleteRecipe(recipeList[i]._id)}>Delete This Recipe</button>
      </section>,
    );
  }

  return (
    <div className="recipesDisplay">
      <h4>Recipes</h4>
      {recipes}
      <button type="submit" onClick={addRecipe}>Add a Recipe</button>
    </div>
  );
};

export default RecipesDisplay;
