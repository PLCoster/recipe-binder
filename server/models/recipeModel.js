const mongoose = require('mongoose');

// Schema for recipe document in mongoDB
const recipeSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  numServings: { type: Number, required: true },
  privateRecipe: { type: Boolean, required: true },
  image: { type: String },
});

module.exports = mongoose.model('recipe', recipeSchema);
