const express = require('express');
const multer = require('multer');
const path = require('path');

const recipeController = require('../controllers/recipeController');
const sessionController = require('../controllers/sessionController');

// Configure multer for storing images on disc
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

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

router.post('/recipe', upload.single('image'), recipeController.addRecipe, sessionController.validateSession, (req, res) => {
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

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };



module.exports = router;
