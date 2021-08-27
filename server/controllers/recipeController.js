const Recipe = require('../models/recipeModel');

const recipeController = {};

recipeController.getRecipes = async (req, res, next) => {
  // Get all recipes by user and returns them in an array
  try {
    console.log(req.cookies);
    const { ssid } = req.cookies;
    const result = await Recipe.find({ userID: ssid });
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

recipeController.getRecipeDetails = async (req, res, next) => {
  console.log('Trying to get recipe from id:', req.params);
  // Get all recipes and return them as an array
  try {
    const result = await Recipe.findOne({ _id: req.params.id });
    res.locals.recipeDetails = result;
    return next();
  } catch (err) {
    console.log('ERROR in getRecipes', err);
    return next({
      log: `Error in recipeController.getRecipeDetails: ERROR: ${err}`,
      message: { err: 'Error getting recipe details from database - see server logs' },
    });
  }
};

recipeController.addRecipe = async (req, res, next) => {
  // Get request body for DB input
  console.log('Request to addRecipe, :', req.body, req.file);

  // Add new recipe to the db
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const result = await Recipe.create({...req.body, userID: req.cookies.ssid });
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

recipeController.updateRecipe = async (req, res, next) => {
  // Get request body for item to be deleted
  delete req.body.__v
  console.log('Request to updateRecipe, :', req.body);

  // Add new recipe to the db
  try {
    const result = await Recipe.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    console.log('Tried to update recipe, result: ', result);
    res.locals.updatedRecipe = result;
    return next();
  } catch (err) {
    return next({
      log: `Error in recipeController.updateRecipe: ERROR: ${err}`,
      message: { err: 'Error updating recipe in database - see server logs' },
    });
  }
};

module.exports = recipeController;
