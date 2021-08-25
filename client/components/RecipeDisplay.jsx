import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// Basic functional class (needs state to work properly) -> Use React Hooks
const RecipeDisplay = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  // // Function that fetches recipe details from server
  // const getRecipeDetails = () => {

  // }

  // useEffect(() => {
  //   // Fetch the single recipe details in here
  //   // Similar to component did mount

  // })

  return (
    <section>
      <h1>This is your recipe!</h1>
      <h4>
        Recipe Id:
        {id}
      </h4>
    </section>
  );
};

export default RecipeDisplay;
