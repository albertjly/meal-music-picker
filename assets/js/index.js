
//DOM Elements 
var randomButton = document.querySelector(".btn-random");

var mealImageCon = document.querySelector(".meal-img");
var mealTitleCon = document.querySelector(".meal-title");
var mealYieldCon = document.querySelector(".yield");
var mealIngredientsCon = document.querySelector(".meal-ingredients");
var dietLabelCon = document.querySelector(".diet-details");
var nutritionInfoCon = document.querySelector(".nutrition-facts")
var recipeBoxButton = document.querySelector(".box");

//Recipies Key/ID
var app_key = "bfff307b245dc8b98d49e452f8586302";
var app_id = "0eb52ae4"; 



//Global Var
var mealType = '';
var protein = '';
var health= '';

//var proteinArray = ["Chicken", "Beef", "Pork", "Fish" , "Turkey"]


//update drop downs
var updateMealDropDown = function(dropDownSelection) {
    //alert(i);
    document.getElementById("meal-input").innerHTML = dropDownSelection ; 
    mealType = dropDownSelection;


}
var updateProteinDropDown = function(dropDownSelection) {
    //alert(i);
    document.getElementById("protien-input").innerHTML = dropDownSelection ; 
    protein = dropDownSelection;
}
var updateHealthDropDown = function(dropDownSelection) {
    document.getElementById("health-input").innerHTML = dropDownSelection ; 
    health = dropDownSelection;
}



// on click randomize
var randomizeHandler = function (event) {
    event.preventDefault();
    // clear();

    if(mealType === "" || protein === "" || health === "") {
       //alert("Please pick a meal type, protein, and health tag!")
       
       var modal = document.createElement("div");
       modal.setAttribute("class", "modal is-active");
       var modalBack = document.createElement("div");
       modalBack.setAttribute("class", "modal-background");
       var modalContent = document.createElement("div");
       modalContent.setAttribute("class", "modal-content is-clipped")
       modalContent.innerHTML =  "Please pick a meal type, protein, and health tag!";
       var modalButton = document.createElement("button");
       modalButton.setAttribute("class", "modal-close is-large");
       modalButton.setAttribute("aria-label", "close");
       modalButton.setAttribute("type", "submit")

       modal.append(modalBack,modalContent,modalButton);
       $("body").append(modal);

       modalButton.addEventListener("click", function() {
        modal.classList.remove('is-active')
       });

    } else {
        getRecipeData();
        getMusic();
    }
    
    
}
var title;
//fetch meal information 
var getRecipeData = function () {
    var mealUrl = "https://api.edamam.com/search?q=" + protein + "&app_id=" + app_id + "&app_key="+ app_key; + "&mealType=" + mealType + "&health=" + health;
    
        fetch(mealUrl)
            .then(function(response){
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                      
                        //random
                        function getRandomInt() {
                            return Math.floor(Math.random() * 9) +1;   
                        }

                        //recipeie data 
                        var randomInt = getRandomInt();
                        title = data.hits[randomInt].recipe.label;
                        var img = data.hits[randomInt].recipe.image;
                        var yield = data.hits[randomInt].recipe.yield;
                        var ingridents = data.hits[randomInt].recipe.ingredientLines;
                        var dietLabels = data.hits[randomInt].recipe.dietLabels;
                        var nutritionInfo = [
                            "Calories: "+ Math.round(data.hits[randomInt].recipe.calories),
                             "Chloesterol: "+ Math.round(data.hits[randomInt].recipe.totalNutrients.CHOLE.quantity) + data.hits[randomInt].recipe.totalNutrients.CHOLE.unit,
                             "Carbs: "+ Math.round(data.hits[randomInt].recipe.totalNutrients.CHOCDF.quantity) + data.hits[randomInt].recipe.totalNutrients.CHOCDF.unit,
                             "Sodium: " +  Math.round(data.hits[randomInt].recipe.totalNutrients.NA.quantity) + data.hits[randomInt].recipe.totalNutrients.NA.unit,
                             "Fat: " + Math.round(data.hits[randomInt].recipe.totalNutrients.FAT.quantity) + data.hits[randomInt].recipe.totalNutrients.FAT.unit,
                            "Sugar: " + Math.round(data.hits[randomInt].recipe.totalNutrients.SUGAR.quantity) + data.hits[randomInt].recipe.totalNutrients.SUGAR.unit
                        ];

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
    clear();

    //add meal img to bpage 
    var mealImg = document.createElement("img");
    mealImg.setAttribute("src", img);
    mealImageCon.append(mealImg);
    
    // add meal title 
    var mealTitle = document.createElement("h1");
    mealTitle.setAttribute("class", "title is-3")
    mealTitle.innerHTML = title;
    mealTitleCon.append(mealTitle);

    //add yield to ingridents div
    var mealYield = document.createElement("p");
    mealYield.innerHTML = "Yield: " + yield;
    mealYieldCon.append(mealYield);

    //add indirgent to page ARRAY
    for (var i = 0; i<ingridents.length; i++) {
        var mealIngr = document.createElement("li");
        mealIngr.setAttribute("class", "is-lower-alpha")
        mealIngr.innerHTML = ingridents[i];
        mealIngr.setAttribute('is-flex-direction-row','flex-direction: row');
        //mealIngr.style.display = "flex flex-column";
        mealIngredientsCon.appendChild(mealIngr);
    }
    // add diet labels to page ARRAY
    if (dietLabels.length === 0) {
        var dietLabelEl = document.createElement("span");
        dietLabelEl.innerHTML = "No diet labels exsits"
         dietLabelCon.append(dietLabelEl);

    } else {
        for (var i = 0; i<dietLabels.length; i++) {
            var dietLabelEl = document.createElement("span");
            dietLabelEl.setAttribute("class", "tag is-large is-light");
            dietLabelEl.setAttribute('is-flex-direction-column','flex-direction: column');
            dietLabelEl.setAttribute('is-justify-align-center', 'justify-align: center')
            dietLabelEl.setAttribute('is-flex-wrap-wrap', 'flex-wrap: wrap')
    
           
            dietLabelEl.innerHTML = dietLabels[i]
        
            //dietLabelEl.innerHTML = dietLabels[i];
            dietLabelCon.append(dietLabelEl);
        }
    }    
    
    //add nutrion info to page 
    for (var i = 0; i<nutritionInfo.length; i++) {
        var nutrition = document.createElement("li");
        nutrition.innerHTML = nutritionInfo[i];
        nutritionInfoCon.append(nutrition);
    }


}

// variable for music chosen
var musicTitleCon = document.querySelector(".music-title");
var getMusic = function(){  

    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + protein, {
         "method": "GET",
         "headers": {
             "x-rapidapi-key": "745e72bfb2mshcd1b1af9ded37c3p1ca71djsnfeb89c9db301",
             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
         }
     })
     .then(response => response.json())
     .then((response) => {
        function getPreviewMusic() {
            return Math.floor(Math.random() * 24) +1;   
        }
        var randomSong = getPreviewMusic();
         var chosenMusic = response.data[randomSong].preview;
         var songTitle = "Song Title: " + "'" + response.data[randomSong].title + "'";
         var songArtist = "  Artist: " + response.data[randomSong].artist.name ;
         

    //append to html
     var musicPlay = document.getElementById('audio');
     musicPlay.src = chosenMusic ;
    
     var songHeader = document.createElement('h1');
     songHeader.setAttribute('class', 'title is-3');
     songHeader.innerHTML = songTitle;
     musicTitleCon.append(songTitle);
     musicTitleCon.append(songArtist);
     })

}

  //onclick save to localstorage
  var saveStorage = function(){
      //console.log(title);
     localStorage.setItem(title, JSON.stringify(title));
}



var clear = function () {
    mealIngredientsCon.innerHTML = ""; 
    mealYieldCon.innerHTML = ""; 
    mealTitleCon.innerHTML = ""; 
    mealImageCon.innerHTML = ""; 
    dietLabelCon.innerHTML = "";
    nutritionInfoCon.innerHTML = "";

}


//event listeners for search click
randomButton.addEventListener("click", randomizeHandler)
