const express = require('express');
const router = express.Router();

const {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');

const { validateRecipe } = require('../middleware/validate');

router.get('/', getRecipes);
router.post('/', protect, validateRecipe, createRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', protect, validateRecipe, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
module.exports = router;