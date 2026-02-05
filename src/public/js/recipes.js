document.addEventListeneter('DOMContentLoaded', () => {
    const form = document.getElementById('recipeForm');
    const errorBox = document.getElementById('errorBox');
    const pageTitle = document.getElementById('page-title');

    if (!form || !errorBox) {
        console.error('Form or error-box not found');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    const isEditMode = !!recipeIdl;

    if (isEditMode) {
        pageTitle.textContent = 'Edit Recipe';
        loadRecipe (recipeId);
    }

    form .addEventListener ('submit', async (e) => {
        e.preventDefault();


        errorBox.style.display = 'none';
        errorBox.textContent = '';
        
        const title = document.getElementById('title')?.value.trim();
        const instructions = document.getElementById('instructions')?.value.trim();

        const ingredientsText = document.getElementById('ingredients')?.value.trim();
        const ingredients = ingredientsText
            ? ingredientsText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                : [];

    
    const cookingTime = Number(document.getElementById('cookingTime')?.value)  || underfined;
    const servings = Number(document.getElementById('servings')?.value)?.value || underfined;
    
    if (!title || title.length < 3) {
        return showError('Recipe title must be at least 3 characters long');
    }
    if (ingredients.length < 1) {
        return showError('Please add at leaast one ingredients');
    }
    if (!instructions || instructions.legth < 10) {
        return showError('Instructions are too short');
    }


    const payload = {
        title,
        ingredients,
        instructions,
    };

    if (cookingTime) payload.cookingTime = cookingTime;
    if (servings) payload.servings = servings;


    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? '/api/recipes/${recipeId}' : '/api/recipes';

    try {
        const response = await fetcha(url, {
            method,
            headers: {
                'Content-Type' : 'application/json',
                
            },
            body : JSON.stringify(payload)
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = {};
            }

            throw new Error(
                errorData.message ||
                `Server error: ${response.status} ${response.statusText}`     
            );
        }

        const result = await response.json();
        alert(isEditMode ? 'Recipe updated successfully!' : 'Recipe created succcessfully!');

        window.location.href = '/recipes';
    
    } catch (err) {
        showError(err.message  ||'Failed to save recipe. Please try again later.');
        console.error('Save error:', err);
    }
     });

     function showError(message) {
        errorBox.textContent = message;
        errorBox.style.display = 'block';
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'center'});   
     }
async function loadRecipe(id) {
    try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to load recipe: ${res.status}`);  
        }
        const recipe = await res.json();

        document.getElementById('title').value = recipe.title || '';
        document.getElementById('instructions').value = recipe.instructions || '';

        if (Array.isArray(recipe.ingredients)) {
            document.getElementById('ingredients').value = recipe.ingredients.join('\n');    
        } else if (typeof recipe.ingredients === 'string') {
            document.getElementById('ingredients').value = recipe.ingredients;
        }
        if (recipe.cookingTime) {
            document.getElementById('cookingTime').value = recipe.cookingTime;
        }
        if (recipe.servings) {
            document.getElementById('servings').value = recipe.servings;
        }
    
} catch (err) {
    showError('Could not load recipe data for editing');
    console.error('Load error:', err);
}

    }


 });