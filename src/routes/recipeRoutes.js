const express = require('express');
const router = express.Router();

const {
    getRecipes,
    createRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getRecipes);
router.post('/', protect, createRecipe);
router.delete('/:id', protect, deleteRecipe);
module.exports = router;