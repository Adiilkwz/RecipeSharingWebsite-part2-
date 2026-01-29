const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true,
        trim: true,
    },

    ingredients: {
        type: [String],
        required: true,
    },
    
    instructions: {
        type: String,
        required: true,
    },

    time: {
        type: Number,
    },

    category: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  },
  {
    timesamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
