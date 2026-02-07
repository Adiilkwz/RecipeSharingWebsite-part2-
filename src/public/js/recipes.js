const listContainer = document.getElementById('recipe-list');

async function loadRecipes() {
    try {
        const recipes = await apiRequest('/recipes');

        if (!recipes || recipes.length === 0) {
            listContainer.innerHTML = '<p style="text-align:center;">No recipes found. Create one!</p>';
            return;
        }

        listContainer.innerHTML = ''; 

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            let authorName = 'Chef';
            if (recipe.user && recipe.user.username) {
                authorName = recipe.user.username;
            }
            
            card.innerHTML = `
                <div class="recipe-content">
                    <h3 class="recipe-title">${escapeHtml(recipe.title)}</h3>
                    <p class="recipe-meta">By ${escapeHtml(recipe.authorName)}</p>
                    <p style="font-size: 0.9rem; color: #666;">
                        ${recipe.time || 0} min
                    </p>
                </div>
                <div class="recipe-actions">
                    <a href="recipe.html?id=${recipe._id}" class="btn">View</a>
                </div>
            `;
            listContainer.appendChild(card);
        });

    } catch (error) {
        listContainer.innerHTML = `<p style="color:red; text-align:center;">Error: ${error.message}</p>`;
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

if (document.getElementById('recipe-list')) {
    loadRecipes();
}