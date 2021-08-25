const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// Router to handle requests from client React components for data from
// the server/database

router.get('/', recipeController.getRecipes, (req, res) => {
  console.log('ENTERED GET ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.recipes);
});

router.post('/recipe', recipeController.addRecipe, (req, res) => {
  console.log('ENTERED ADD RECIPE ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.addedRecipe);
});

router.delete('/recipe', recipeController.deleteRecipe, (req, res) => {
  console.log('ENTERED DELETE RECIPE ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.deletedRecipe);
});

module.exports = router;
