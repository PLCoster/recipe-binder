import React from 'react';

const RecipeCreator = ({ addRecipe, updateFormVal, formVals }) => {
  console.log('In recipe creator');
  // Get all current form values from state to allow reset on submit
  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    numServings,
    privateRecipe,
  } = formVals;

  return (
    <section>
      <h4>Create a new recipe!</h4>
      <form onSubmit={(e) => {
        console.log('Trying to add recipe! Event is: ', e);
        e.preventDefault();
        addRecipe();
      }}
      >
        <h5>Recipe Title:</h5>
        <input
          type="text"
          placeholder="Recipe Title"
          onChange={(e) => updateFormVal(e.target.value, 'title')}
          value={title}
          name="title"
          required
        />
        <textarea
          placeholder="Recipe Description"
          onChange={(e) => updateFormVal(e.target.value, 'description')}
          value={description}
          name="description"
          required
        />
        <textarea
          placeholder="Recipe Ingredients"
          onChange={(e) => updateFormVal(e.target.value, 'ingredients')}
          value={ingredients}
          name="ingredients"
          required
        />
        <textarea
          placeholder="Recipe Instructions"
          onChange={(e) => updateFormVal(e.target.value, 'instructions')}
          value={instructions}
          name="instructions"
          required
        />
        <input
          type="text"
          placeholder="Preparation Time"
          onChange={(e) => updateFormVal(e.target.value, 'prepTime')}
          value={prepTime}
          name="prepTime"
          required
        />
        <input
          type="text"
          placeholder="Cooking Time"
          onChange={(e) => updateFormVal(e.target.value, 'cookTime')}
          value={cookTime}
          name="cookTime"
          required
        />
        <input
          type="text"
          placeholder="Number of Servings"
          onChange={(e) => updateFormVal(e.target.value, 'numServings')}
          value={numServings}
          name="numServings"
          required
        />
        <select
          onChange={(e) => updateFormVal(e.target.value === 'true', 'private')}
          name="private"
        >
          <option value="true" selected>Private</option>
          <option value="false" >Public</option>
        </select>

        <button type="submit">
          Add a Recipe!
        </button>

      </form>
    </section>
  );
};

export default RecipeCreator;

{/* <section>
    <h4>Create New Market:</h4>
    <h4>Location:
      <input
        id="location-input"
        type="text"
        onChange={(e)=>props.setNewLocation(e.target.value)}
        value={props.newLocation}
      />
      <button onClick={props.addMarket}>Add Market</button>
    </h4>
    <hr/>
  </section> */}