document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const errorBox = document.getElementById('error-box');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (errorBox) errorBox.style.display = 'none';

        try {
            const title = form.title.value;
            const category = form.category.value;
            const rawIngredients = form.ingredients.value;
            const instructions = form.instructions.value;
            const cookingTime = form.cookingTime.value;


            const ingredientsArray = rawIngredients.split('\n').filter(line => line.trim() !== '');

            const recipeData = {
                title,
                category: category,
                ingredients: ingredientsArray,
                instructions,
                time: Number(cookingTime),
            };

            await apiRequest('/recipes', 'POST', recipeData);
            window.location.href = 'dashboard.html';

        } catch (error) {
            if (errorBox) {
                errorBox.textContent = "Error: " + error.message;
                errorBox.style.display = 'block';
                errorBox.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert("Error: " + error.message);
            }
        }
    });
});