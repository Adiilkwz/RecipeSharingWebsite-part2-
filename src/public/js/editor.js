document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const errorBox = document.getElementById('error-box');

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (errorBox) errorBox.style.display = 'none';

            try {
                const title = form.title.value;
                const category = form.category.value;
                const rawIngredients = form.ingredients.value;
                const instructions = form.instructions.value;
                const cookingTime = form.cookingTime.value;

                const titleRegex = /^[a-zA-Z0-9 ]+$/;
                
                if (!titleRegex.test(title)) {
                    throw new Error('Title contains invalid characters. Please use only letters, numbers, and spaces.');
                }

                for (let i = 0; i < ingredientsArray.length; i++) {
                    const ing = ingredientsArray[i].trim();
                    if (!titleRegex.test(ing)) {
                        throw new Error(`Invalid characters in Ingredient on line ${i + 1}: "${ing}".\nUse only letters, numbers, and spaces.`);
                    }
                }

                const instructionLines = instructions.split('\n');
                
                for (let i = 0; i < instructionLines.length; i++) {
                    const line = instructionLines[i].trim();
                    
                    if (line.length === 0) continue;

                    const startsWithNumber = /^\d+\./.test(line);

                    if (!startsWithNumber) {
                        throw new Error(`Invalid format in Instructions on line ${i + 1}: "${line}".\nEvery line must start with a number (e.g., "1. Preheat oven").`);
                    }
                }
               
                const ingredientsArray = rawIngredients.split('\n').filter(line => line.trim() !== '');

                const recipeData = {
                    title: title,
                    category: category,
                    ingredients: ingredientsArray,
                    instructions: instructions,
                    time: Number(cookingTime)
                };

                await apiRequest('/recipes', 'POST', recipeData);
                
                window.location.href = 'dashboard.html';

            } catch (error) {
                console.warn("Validation/API Error:", error);
                if (errorBox) {
                    errorBox.textContent = error.message;
                    errorBox.style.display = 'block';
                    errorBox.style.whiteSpace = 'pre-wrap';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert(error.message);
                }
            }
        });
    }
});