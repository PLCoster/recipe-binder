const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// Router to handle requests from client React components for data from
// the server/database

router.get('/', recipeController.getRecipes, (req, res) => {
  console.log('ENTERED GET ROUTE OF API ROUTER');
  return res.status(200).json(res.locals.recipes);
})

module.exports = router;
