import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

// React class component to create new recipes and add them to db via api call:
class RecipeCreator extends Component {
  constructor(props) {
    super(props);

    this.initialFormVals = {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      numServings: '',
      privateRecipe: true,
    };

    this.state = { redirectTo: '', formVals: { ...this.initialFormVals } };

    this.addRecipe = this.addRecipe.bind(this);
  }

  // Function to add recipe to the DB from inputted form data
  addRecipe() {
    console.log('Trying to add a new recipe to DB', this.state.formVals);

    fetch('/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formVals),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Error when trying to add recipe via api, status: ', response.status);
      })
      .then((recipeObj) => {
        // Clear form input to initial state
        this.setState({
          formVals: { ...this.initialFormVals },
          redirectTo: "/",
        });
        // Redirect to your recipes
        console.log('PROPS AFTER ADDING: ', this.props);

      })
      .catch((error) => console.error(error));
  }

  // Updates form values in state as they are changed
  updateFormVal(value, key) {
    console.log('Updating form values: ', key, value);
    this.setState({formVals: {...this.state.formVals, [key]: value}});
  }

  render() {
    // If there is a redirect, go there
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      numServings,
      privateRecipe,
    } = this.state.formVals;

    return (
      <section>
        <h4>Create a new recipe!</h4>
        <form onSubmit={(e) => {
          console.log('Trying to add recipe! Event is: ', e);
          e.preventDefault();
          this.addRecipe();
        }}
        >
          <h5>Recipe Title:</h5>
          <input
            type="text"
            placeholder="Recipe Title"
            onChange={(e) => this.updateFormVal(e.target.value, 'title')}
            value={title}
            name="title"
            required
          />
          <textarea
            placeholder="Recipe Description"
            onChange={(e) => this.updateFormVal(e.target.value, 'description')}
            value={description}
            name="description"
            required
          />
          <textarea
            placeholder="Recipe Ingredients"
            onChange={(e) => this.updateFormVal(e.target.value, 'ingredients')}
            value={ingredients}
            name="ingredients"
            required
          />
          <textarea
            placeholder="Recipe Instructions"
            onChange={(e) => this.updateFormVal(e.target.value, 'instructions')}
            value={instructions}
            name="instructions"
            required
          />
          <input
            type="text"
            placeholder="Preparation Time"
            onChange={(e) => this.updateFormVal(e.target.value, 'prepTime')}
            value={prepTime}
            name="prepTime"
            required
          />
          <input
            type="text"
            placeholder="Cooking Time"
            onChange={(e) => this.updateFormVal(e.target.value, 'cookTime')}
            value={cookTime}
            name="cookTime"
            required
          />
          <input
            type="number"
            placeholder="Number of Servings"
            onChange={(e) => this.updateFormVal(e.target.value, 'numServings')}
            value={numServings}
            name="numServings"
            required
          />
          <select
            onChange={(e) => this.updateFormVal(e.target.value === 'true', 'private')}
            name="private"
          >
            <option value="true" selected>Private</option>
            <option value="false">Public</option>
          </select>

          <button type="submit">
            Add a Recipe!
          </button>

        </form>
      </section>
    );
  }
}

// ### FUNCTIONAL RECIPE CREATOR USED BEFORE SEPARATING ROUTES WITH REACT ROUTER
// const RecipeCreator = ({ addRecipe, updateFormVal, formVals }) => {
//   console.log('In recipe creator');
//   // Get all current form values from state to allow reset on submit
//   const {
//     title,
//     description,
//     ingredients,
//     instructions,
//     prepTime,
//     cookTime,
//     numServings,
//     privateRecipe,
//   } = formVals;

//   return (
//     <section>
//       <h4>Create a new recipe!</h4>
//       <form onSubmit={(e) => {
//         console.log('Trying to add recipe! Event is: ', e);
//         e.preventDefault();
//         addRecipe();
//       }}
//       >
//         <h5>Recipe Title:</h5>
//         <input
//           type="text"
//           placeholder="Recipe Title"
//           onChange={(e) => updateFormVal(e.target.value, 'title')}
//           value={title}
//           name="title"
//           required
//         />
//         <textarea
//           placeholder="Recipe Description"
//           onChange={(e) => updateFormVal(e.target.value, 'description')}
//           value={description}
//           name="description"
//           required
//         />
//         <textarea
//           placeholder="Recipe Ingredients"
//           onChange={(e) => updateFormVal(e.target.value, 'ingredients')}
//           value={ingredients}
//           name="ingredients"
//           required
//         />
//         <textarea
//           placeholder="Recipe Instructions"
//           onChange={(e) => updateFormVal(e.target.value, 'instructions')}
//           value={instructions}
//           name="instructions"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Preparation Time"
//           onChange={(e) => updateFormVal(e.target.value, 'prepTime')}
//           value={prepTime}
//           name="prepTime"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Cooking Time"
//           onChange={(e) => updateFormVal(e.target.value, 'cookTime')}
//           value={cookTime}
//           name="cookTime"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Number of Servings"
//           onChange={(e) => updateFormVal(e.target.value, 'numServings')}
//           value={numServings}
//           name="numServings"
//           required
//         />
//         <select
//           onChange={(e) => updateFormVal(e.target.value === 'true', 'private')}
//           name="private"
//         >
//           <option value="true" selected>Private</option>
//           <option value="false" >Public</option>
//         </select>

//         <button type="submit">
//           Add a Recipe!
//         </button>

//       </form>
//     </section>
//   );
// };

export default RecipeCreator;