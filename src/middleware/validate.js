const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const recipeSchema = Joi.object({
    title: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).min(1).required()
});

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        res.status(400);
        return next(new Error(error.details[0].message));
    }
    next();
};

const validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        res.status(400);
        return next(new Error(error.details[0].message));
    }
    next();
};

module.exports = { validateRegister, validateRecipe };