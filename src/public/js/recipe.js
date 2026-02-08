const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

if (!recipeId) window.location.href = 'dashboard.html';

async function loadRecipeDetails() {
    try {
        const recipe = await apiRequest(`/recipes/${recipeId}`);

        document.getElementById('recipe-title').textContent = recipe.title;
        const authorSpan = document.getElementById('recipe-author');
        authorSpan.textContent = recipe.user ? recipe.user.username : "Unknown Chef";
        
        document.getElementById('recipe-time').textContent = (recipe.time || 0) + ' min';
        document.getElementById('recipe-instructions').innerHTML = `<p>${recipe.instructions.replace(/\n/g, '<br>')}</p>`;

        const ul = document.getElementById('recipe-ingredients');
        ul.innerHTML = '';
        const ingredientsList = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

        ingredientsList.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ul.appendChild(li);
        });

        const actionDiv = document.getElementById('recipe-actions');
        if (actionDiv) {
            actionDiv.innerHTML = ''; 

            const editBtn = document.createElement('button');
            editBtn.className = 'btn';
            editBtn.textContent = 'Edit Recipe';
            
            editBtn.onclick = () => {
                const viewDiv = document.getElementById('recipe-view-mode');
                const formDiv = document.getElementById('recipe-edit-form');
                
                if (viewDiv && formDiv) {
                    viewDiv.style.display = 'none';
                    formDiv.style.display = 'block';

                    document.getElementById('edit-title').value = recipe.title;
                    document.getElementById('edit-time').value = recipe.time || 0;
                    document.getElementById('edit-category').value = recipe.category || 'Lunch';
                    document.getElementById('edit-ingredients').value = ingredientsList.join('\n');
                    document.getElementById('edit-instructions').value = recipe.instructions;
                }
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.textContent = 'Delete Recipe';
            deleteBtn.onclick = deleteRecipe;
            
            actionDiv.appendChild(editBtn);
            actionDiv.appendChild(deleteBtn);
        }

    } catch (error) {
        console.error("Load Error:", error);
    }
}

const recipeEditForm = document.getElementById('recipe-edit-form');
if (recipeEditForm) {
    recipeEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const instructions = document.getElementById('edit-instructions').value;
        
        const updatedData = {
            title: document.getElementById('edit-title').value.trim(),
            category: document.getElementById('edit-category').value,
            ingredients: document.getElementById('edit-ingredients').value.split('\n').filter(line => line.trim() !== ''),
            instructions: instructions,
            time: Number(document.getElementById('edit-time').value)
        };

        try {
            if (!/^[a-zA-Z0-9 ]+$/.test(updatedData.title)) {
                throw new Error('Title contains invalid characters. Use only letters, numbers, and spaces.');
            }

            for (let i = 0; i < updatedData.ingredients.length; i++) {
                if (!/^[a-zA-Z0-9 ]+$/.test(updatedData.ingredients[i].trim())) {
                    throw new Error(`Invalid characters in Ingredient on line ${i + 1}.`);
                }
            }

            const instructionLines = instructions.split('\n');
            for (let i = 0; i < instructionLines.length; i++) {
                const line = instructionLines[i].trim();
                
                if (line.length === 0) continue;

                const startsWithNumber = /^\d+\./.test(line);

                if (!startsWithNumber) {
                    throw new Error(
                        `Invalid format in Instructions on line ${i + 1}: "${line}".\n` +
                        `Every line must start with a number (e.g., "1. Preheat oven").`
                    );
                }
            }
            await apiRequest(`/recipes/${recipeId}`, 'PUT', updatedData);
            
            alert('Recipe updated successfully!');
            location.reload(); 

        } catch (error) {
            console.warn("Update Validation Error:", error);
            alert(error.message);
        }
    });
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