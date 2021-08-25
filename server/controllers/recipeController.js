const Recipe = require('../models/recipeModel');

const recipeController = {};

recipeController.getRecipes = async (req, res, next) => {
  // Get all recipes and return them as an array
  try {
    const result = await Recipe.find({});
    console.log('Tried to get recipes, result: ', result);
    res.locals.recipes = result;
    return next();
  } catch (err) {
    return next({
      log: `Error in recipeController.getRecipes: ERROR: ${err}`,
      message: { err: 'Error getting recipes from database - see server logs' },
    });
  }
};

recipeController.addRecipe = async (req, res, next) => {
  // Get request body for DB input
  console.log('Request to addRecipe, :', req.body);

  // Add new recipe to the db
  try {
    const result = await Recipe.create({name: req.body.name});
    console.log('Tried to add recipe, result: ', result);
    res.locals.addedRecipe = result;
    return next();
  } catch (err) {
    return next({
      log: `Error in recipeController.addRecipe: ERROR: ${err}`,
      message: { err: 'Error getting recipes from database - see server logs' },
    });
  }
};

recipeController.deleteRecipe = async (req, res, next) => {
  // Get request body for item to be deleted
  console.log('Request to deleteRecipe, :', req.body);

  // Add new recipe to the db
  try {
    const result = await Recipe.findOneAndDelete({ _id: req.body.id });
    console.log('Tried to delete recipe, result: ', result);
    res.locals.deletedRecipe = result;
    return next();
  } catch (err) {
    return next({
      log: `Error in recipeController.deleteRecipe: ERROR: ${err}`,
      message: { err: 'Error deleting recipe from database - see server logs' },
    });
  }
};

module.exports = recipeController;
