const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer= document.querySelector('.recipe-container');
const recipeDetailsContent= document.querySelector('.recipe-details-content');
const recipeCloseBtn= document.querySelector('.recipe-close-btn');
//function to get recipe
const fetchRecipes= async (query) =>{
    recipeContainer.innerHTML= "Fetching Recipe......";
     const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
     const response= await data.json();

    recipeContainer.innerHTML= "";
     response.meals.forEach(meal =>{
        const recipeDiv= document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p><span>${meal.strArea}</span></p>
           <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
         const button= document.createElement('button');
         button.textContent= "View Recipe";
         recipeDiv.appendChild(button);

      // adding event listner to recipe button
      button.addEventListener('click', ()=>{
         openRecipePopup(meal)
      })

        recipeContainer.appendChild(recipeDiv);
     });
    
}


const fetchIngredients=(meal)=>{
  let ingredientsList="";
  for(let i=1; i<=20;i++ ){
   const ingredient= meal[`strIngredient${i}`];
   if(ingredient){
      const measure= meal[`strMeasure${i}`];
      ingredientsList+= `<li>${measure} ${ingredient}</li>`
   }
   else{
      break;
   }
  }
  return ingredientsList;
}
const openRecipePopup=(meal) =>{
   recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal} </h2>
      <h3>Ingredents:</h3>
      <ul class="IngredientsList">${fetchIngredients(meal)}</ul>
      <div class="recipeInstructions">
           <h3>Instructions:</h3>
           <p>${meal.strInstructions}</p>
     </div>
   `
   recipeDetailsContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click', ()=>{
   recipeDetailsContent.parentElement.style.display="none";
})
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput= searchBox.value.trim()
    fetchRecipes(searchInput);
    // console.log("Button Clicked")
});
