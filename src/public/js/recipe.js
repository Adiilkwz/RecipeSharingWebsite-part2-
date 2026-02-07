const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

if (!recipeId) window.location.href = 'dashboard.html';

async function loadRecipeDetails() {
    try {
        const recipe = await apiRequest(`/recipes/${recipeId}`);

        console.log("🔥 RECIPE:", recipe);

        document.getElementById('recipe-title').textContent = recipe.title;

        const authorSpan = document.getElementById('recipe-author');
        
        authorSpan.textContent = recipe.user.username;
        authorSpan.style.color = "#d35400";
        
        document.getElementById('recipe-time').textContent = (recipe.time || 0) + ' min';
        
        document.getElementById('recipe-instructions').innerHTML = `<p>${recipe.instructions.replace(/\n/g, '<br>')}</p>`;

        const ul = document.getElementById('recipe-ingredients');
        ul.innerHTML = '';
        
        const ingredientsList = Array.isArray(recipe.ingredients) 
            ? recipe.ingredients 
            : recipe.ingredients.split('\n');

        ingredientsList.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ul.appendChild(li);
        });

        const actionDiv = document.getElementById('recipe-actions');
        if (actionDiv) {
            actionDiv.innerHTML = ''; 
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete Recipe';
            deleteBtn.onclick = deleteRecipe;
            actionDiv.appendChild(deleteBtn);
        }

    } catch (error) {
        console.error(error);
    }
}

async function deleteRecipe() {
    if(!confirm('Are you sure you want to delete this recipe?')) return;
    try {
        await apiRequest(`/recipes/${recipeId}`, 'DELETE');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Delete failed: ' + error.message);
    }
}

loadRecipeDetails();