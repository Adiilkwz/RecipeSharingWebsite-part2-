const Recipe = require("../models/recipe");

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("user", "username"); 
        res.json(recipes); 
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const createRecipe = async (req, res) =>{
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json(recipe);
   } catch (error) {
      res.status(400).json({message: error.message});
   }
};

const deleteRecipe = async (req, res) =>{
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found"});
        }
        await recipe.deleteOne();
        res.json({ message: "Recipe removed"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {
    getRecipes,
    createRecipe,
    deleteRecipe,
};