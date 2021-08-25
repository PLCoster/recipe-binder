import React from 'react';

const RecipeCreator = ({ addRecipe, updateFormVal, formVals }) => {
  console.log('In recipe creator');
  const { name } = formVals;
  return (
    <section>
      <h4>Create a new recipe!</h4>
      <form onSubmit={(e) => {
        console.log('Trying to add recipe! Event is: ', e);
        e.preventDefault();
        addRecipe();
      }}
      >
        <h5>Recipe Name:</h5>
        <input
          type="text"
          placeholder="Recipe Name"
          onChange={(e) => updateFormVal(e.target.value, 'name')}
          value={name}
          required
        />
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