const express = require('express');
const router = express.Router();

const {
    getRecipes,
    createRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');
router.get('/', getRecipes);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);
module.exports = router;