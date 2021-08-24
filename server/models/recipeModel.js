const mongoose = require('mongoose');

// Schema for recipe document in mongoDB
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('recipe', recipeSchema);
