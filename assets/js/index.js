// origin: https://api.edamam.com/search 
--header "Access-Control-Allow-Origin"
// Access-Control-Allow-Methods: 
// Access-Control-Allow-Headers:


//DOM Elements 
var mealIngredientsCon = document.querySelector(".meal-ingredients");
var mealImageCon = document.querySelector(".meal-img");
var recipeBoxButton = document.querySelector("#box");

//Recipies Key/ID
var app_key = "bfff307b245dc8b98d49e452f8586302";
var app_id = "0eb52ae4"; 
//var protein = []

// var protien = protienInputEl.value();
var protien = 'fish'
// var mealType =  mealInputEl.value();
var mealType = 'lunch'
// var health= healthInputEl.value();
var health = 'dairy-free'



// on click randomize

var randomizeHandler = function (event) {
    event.preventDefault();
    
    //get values from drop down 
    // var protien = protienInputEl.value();
    // var mealType =  mealInputEl.value();
    // var health= healthInputEl.value();

    getRecipeData();

}




//fetch meal information 
var getRecipeData = function () {
    var mealUrl = "https://api.edamam.com/search?q=fish&app_id=" + app_id + "&app_key=$"+ app_key; + "&mealType=lunch&health=dairy-free";
    // "https://api.edamam.com/search?q=" + protein + "&app_id=" + app_id + "&app_key=$"+ app_key; + "&mealType=" + mealType + "&health=" + health;

    var recipie = 
        fetch(mealUrl)
            .then(function(response){
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        //recipeie data 
                        // var title = data.hits.recipe.label;
                        // var img = data.hits.recipe.image;
                        // var yield = data.hits.recipe.yield;
                        // var ingridents = data.hits.recipe.ingredientsLines;
                        // var dietLabels = data.hits.recipe.dietLabels;
                        // var nutritionInfo = {
                        //     calories: data.hits.recipe.calories,
                        //     cholesterol: data.hits.recipe.totalNutrients.chole,
                        //     carbs: data.hits.recipe.totalNutrients.chocdf,
                        //     sodium: data.hits.recipe.totalNutrients.na,
                        //     fat:data.hits.recipe.totalNutrients.fat,
                        //     sugar:data.hits.recipe.totalNutrients.sugar
                        // };

                        //store to local storage


                    });
                }else {
                    alert("Error: " + response.statusText);
                }
            })
            // .catch(function (error) {
            //     alert("Unable to connect to recipe API");
            //     return;
            // });
}


//display recipe inforamtion
// var displayRecipe = function(title, img, yield, ingridents, dietLabels, nutritionInfo) {
//     $(".meal-title").replace(title);
//     $(".yield").append(yield);
//     $(".meal-ingredients").append(ingridents)
//     $(".meal-img").append(img);

// }





//event listeners for search click
recipeBoxButton.addEventListener("click", randomizeHandler);