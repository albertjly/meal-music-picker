var storedRecipe = [];

window.onload = function(){
    storedRecipe = function(){
        localStorage.getItem(getRecipeData);
        console.log(getRecipeData);
    }
}

var recipeCon = document.querySelector(".recipes");
recipeCon.append(storedRecipe);