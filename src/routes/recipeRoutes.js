const express = require('express');
const router = express.Router();

const {
    getRecipes,
    createRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');

const { validateRecipe } = require('../middleware/validate');

router.get('/', getRecipes);
router.post('/', protect, validateRecipe, createRecipe);
router.delete('/:id', protect, deleteRecipe);
module.exports = router;