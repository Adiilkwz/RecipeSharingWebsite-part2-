async function getRecipes(){
    try{
        const response = await getch('/api/recipes');
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error('Error fetching recipes:', error);
        return [];
    }
}

function renderRecipes(recipes){
    const container = document.getElementById("recipe-list");
    if (!container) return;
    container.innerHTML = "";
    recipes.forEach((recipe) =>{
        const card = `
        <div class="recipe-card" onclick="viewRecipe('${recipe._id}')">
        <h3>${recipte.title}</h3>
        <p><strong>Category:</strong> ${recipe.category || "N/A"}</p>
        <p><strong>Time:</strong> ${recipe.time || "-"} min</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        </div>
    `;
     container.innerHTML += card;   
        });
}

function viewRecipe(id){
    window.location.href = `/recipe.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", async () =>{
    const recipes = await getRecipes();
    renderRecipes(recipes);
});