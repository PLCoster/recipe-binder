const express = require('express');
const recipeController = require('../controllers/recipeController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// Router to handle requests from client React components for data from
// the server/database
// User must be logged in to view these routes

router.get('/', sessionController.validateSession, recipeController.getRecipes, (req, res) => {
  console.log('ENTERED GET ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.recipes);
});

router.get('/recipe/:id', sessionController.validateSession, recipeController.getRecipeDetails, (req, res) => {
  console.log('ENTERED GET RECIPE DETAILS ROUTE OF API');
  return res.status(200).json(res.locals.recipeDetails);
});

router.post('/recipe', recipeController.addRecipe, sessionController.validateSession, (req, res) => {
  console.log('ENTERED ADD RECIPE ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.addedRecipe);
});

router.delete('/recipe', sessionController.validateSession, recipeController.deleteRecipe, (req, res) => {
  console.log('ENTERED DELETE RECIPE ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.deletedRecipe);
});

router.put('/recipe', recipeController.updateRecipe, (req, res) => {
  console.log('ENTERED UPDATE RECIPE ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.updatedRecipe);
});

module.exports = router;
