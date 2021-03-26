
//DOM Elements 
var mealImageCon = document.querySelector(".meal-img");
var mealTitleCon = document.querySelector(".meal-title");
var mealYieldCon = document.querySelector(".yield");
var mealIngredientsCon = document.querySelector(".meal-ingredients");

var recipeBoxButton = document.querySelector("#box");

//Recipies Key/ID
var app_key = "bfff307b245dc8b98d49e452f8586302";
var app_id = "0eb52ae4"; 
//var protein = []

// var protien = protienInputEl.value();
var protein = 'fish'
// // var mealType =  mealInputEl.value();
var mealType = 'lunch'
// // var health= healthInputEl.value();
var health = 'dairy-free'

// function getRandomInt() {
//     for (var i = 0; i < 9; i++){
//         var num = Math.floor(Math.random() * 9) +1;
//     }
// }


// on click randomize

var randomizeHandler = function (event) {
    event.preventDefault();
    // clear();
    
    //get values from drop down 
    // var protien = protienInputEl.value();
    // var mealType =  mealInputEl.value();
    // var health= healthInputEl.value();

    getRecipeData();
    
}
// 





//fetch meal information 
var getRecipeData = function () {
    var mealUrl = "https://api.edamam.com/search?q=" + protein + "&app_id=" + app_id + "&app_key="+ app_key; + "&mealType=" + mealType + "&health=" + health;
    
    var recipe 
        fetch(mealUrl)
            .then(function(response){
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);

                        function getRandomInt() {
                            for (var i = 0; i < 9; i++){
                                var num = Math.floor(Math.random() * 9) +1;
                            }
                        }

                        var dataLength = data.hits;
                        for (var i = 0; i < dataLength.length; i++) {
                            console.log(dataLength[getRandomInt]);
                        }

                        //recipeie data 
                        var title = data.hits[0].recipe.label;
                        var img = data.hits[0].recipe.image;
                        var yield = data.hits[0].recipe.yield;
                        var ingridents = data.hits[0].recipe.ingredientLines;
                        var dietLabels = data.hits[0].recipe.dietLabels;
                        var nutritionInfo = {
                            calories: "Calories: "+ Math.round(data.hits[0].recipe.calories),
                            cholesterol: "Chloesterol: "+ Math.round(data.hits[0].recipe.totalNutrients.CHOLE.quantity) + data.hits[0].recipe.totalNutrients.CHOLE.unit,
                            carbs: "Carbs: "+ Math.round(data.hits[0].recipe.totalNutrients.CHOCDF.quantity) + data.hits[0].recipe.totalNutrients.CHOCDF.unit,
                            sodium: "Sodium: " +  Math.round(data.hits[0].recipe.totalNutrients.NA.quantity) + data.hits[0].recipe.totalNutrients.NA.unit,
                            fat: "Fat: " + Math.round(data.hits[0].recipe.totalNutrients.FAT.quantity) + data.hits[0].recipe.totalNutrients.FAT.quantity,
                            sugar: "Sugar: " + Math.round(data.hits[0].recipe.totalNutrients.SUGAR.quantity + data.hits[0].recipe.totalNutrients.FAT.quantity)
                        };

                        console.log(nutritionInfo);
                        
                        displayRecipe(title, img, yield, ingridents, dietLabels, nutritionInfo);
                        //store to local storage
                        //resolve();


                    });
                } 
                else {
                        alert("Error: " + response.statusText);
                        //reject();
                    }
            })
            // .catch(function (error) {
            //     alert("Unable to connect to recipe API");
            //     return;
            // });
    
};


// display recipe inforamtion
var displayRecipe = function (title, img, yield, ingridents, dietLabels, nutritionInfo) {
    // add meal title 
    var mealTitle = document.createElement("h1");
    mealTitle.innerHTML = title;
    mealTitleCon.append(mealTitle);

    //add yield to ingridents div
    var mealYield = document.createElement("p");
    mealYield.innerHTML = "Yield: " + yield;
    mealYieldCon.append(mealYield);

    //add indirgent to page ARRAY
    var mealIngr = document.createElement("li");
    mealIngr.innerHTML = ingridents.values();
    mealIngr.setAttribute('is-flex-direction-row','flex-direction: row')
    //mealIngr.style.display = "flex flex-column";
    // mealIngredientsCon.appendChild(mealIngr);
    
    //add meal img to bpage 
    var mealImg = document.createElement("img");
    mealImg.setAttribute("src", img);
    mealImageCon.append(mealImg);

    // add diet labels to page ARRAY
    var dietLabels = document.createElement("span");
    dietLabels.setAttribute("class", "tag");
    dietLabels.innerHTML = dietLabels;
    //dietLabelCon.append(dietLabels)

    //add nutrion info to page 
    var nutrition = document.createElement("li");
    nutrition.innerHTML = nutritionInfo.values;
    // nutritionInfoCon.append(nutrition);


}

var clear = function () {
    mealIngredientsCon = '';
    mealYieldCon ='';
    mealTitleCon = '';
    mealImageCon = '';
}



//event listeners for search click
recipeBoxButton.addEventListener("click", randomizeHandler)