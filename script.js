document.addEventListener('DOMContentLoaded', function() {
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const recipeList = document.getElementById('recipeList');
    const searchInput = document.getElementById('searchInput');
    const daySelect = document.getElementById('daySelect');
  
    addRecipeBtn.addEventListener('click', function() {
      const recipeName = prompt('Enter dish name:');
      if (recipeName) {
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');
        recipe.innerHTML = `
          <h2>${recipeName}</h2>
          <div class="recipeDetails">
            <label for="prepTime">Prep Time:</label>
            <input type="text" id="prepTime">
            <label for="cookTime">Cook Time:</label>
            <input type="text" id="cookTime">
            <label for="servings">Servings:</label>
            <input type="text" id="servings">
            <label for="difficulty">Difficulty:</label>
            <select id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul class="ingredientList"></ul>
            <input type="text" placeholder="Ingredient" class="ingredientInput">
            <input type="text" placeholder="Quantity" class="quantityInput">
            <button class="addIngredientBtn">Add</button>
          </div>
          <div class="instructions">
            <h3>Instructions:</h3>
            <textarea class="instructionText" rows="4" cols="50"></textarea>
          </div>
          <button class="deleteBtn">Delete</button>
          <select class="category">
            <option value="uncategorized">Uncategorized</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>`;
        recipeList.appendChild(recipe);
  
        const addIngredientBtn = recipe.querySelector('.addIngredientBtn');
        addIngredientBtn.addEventListener('click', function() {
          const ingredientInput = recipe.querySelector('.ingredientInput');
          const quantityInput = recipe.querySelector('.quantityInput');
          const ingredient = ingredientInput.value.trim();
          const quantity = quantityInput.value.trim();
          if (ingredient) {
            const ingredientList = recipe.querySelector('.ingredientList');
            const listItem = document.createElement('li');
            if (quantity) {
              listItem.textContent = `${quantity} ${ingredient}`;
            } else {
              listItem.textContent = ingredient;
            }
            ingredientList.appendChild(listItem);
            ingredientInput.value = '';
            quantityInput.value = '';
          } else {
            alert('Please provide ingredient.');
          }
        });
        
        const selectedDay = daySelect.value;
        const dayElement = document.createElement('div');
        dayElement.textContent = `Day: ${selectedDay}`;
        recipe.insertBefore(dayElement, recipe.firstChild);

        // Attach event listener for delete button
        const deleteBtn = recipe.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function() {
          recipeList.removeChild(recipe);
        });
      }
    });
  
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      const recipes = recipeList.querySelectorAll('.recipe');
  
      recipes.forEach(recipe => {
        const recipeName = recipe.querySelector('h2').textContent.toLowerCase();
        if (recipeName.includes(searchTerm)) {
          recipe.style.display = 'block';
        } else {
          recipe.style.display = 'none';
        }
      });
    });
});
