
//DOM Elements 
var randomButton = document.querySelector(".btn-random");
var mealImageCon = document.querySelector(".meal-img");
var mealTitleCon = document.querySelector(".meal-title");
var mealYieldCon = document.querySelector(".yield");
var mealIngredientsCon = document.querySelector(".meal-ingredients");
var dietLabelCon = document.querySelector(".diet-details");
var nutritionInfoCon = document.querySelector("#nutrition-facts");
var recipeBoxButton = document.querySelector(".box");
var recipeCon = document.querySelector(".recipes-box"); 
var musicTitleCon = document.querySelector(".music-title");
var musicArtistCon = document.querySelector(".music-artist");

//Recipies Key/ID
var app_key = "3a6631ade0c97e6a097cc13ba9e1ff33";
var app_id = "49d9431a"; 



//Global Var
var mealType = '';
var protein = '';
var health= '';
var title;



//update drop downs
var updateMealDropDown = function(dropDownSelection) {
    //alert(i);
    document.getElementById("meal-input").innerHTML = dropDownSelection ; 
    mealType = dropDownSelection;
};
var updateProteinDropDown = function(dropDownSelection) {
    //alert(i);
    document.getElementById("protien-input").innerHTML = dropDownSelection ; 
    protein = dropDownSelection;
};
var updateHealthDropDown = function(dropDownSelection) {
    document.getElementById("health-input").innerHTML = dropDownSelection ; 
    health = dropDownSelection;
};


// on click randomize
var randomizeHandler = function (event) {
    event.preventDefault();

    if(mealType === "" || protein === "" && health === "") {
       
        //modal("Please pick a meal type, protein, and health tag!")
       var modal = document.createElement("div");
       modal.setAttribute("class", "modal is-active is-mobile");
       var modalBack = document.createElement("div");
       modalBack.setAttribute("class", "modal-background");
       var modalContent = document.createElement("div");
       modalContent.setAttribute("class", "modal-content is-clipped");
       modalContent.innerHTML =  "Please pick a meal type, protein, and health tag!";
       var modalButton = document.createElement("button");
       modalButton.setAttribute("class", "modal-close is-large");
       modalButton.setAttribute("aria-label", "close");
       modalButton.setAttribute("type", "submit");

       modal.append(modalBack,modalContent,modalButton);
       $("body").append(modal);

       modalButton.addEventListener("click", function() {
        modal.classList.remove('is-active')
       });

    } else {
        getRecipeData();
        getMusic();
    }
};



//fetch meal information 
var getRecipeData = function () {


    var mealUrl = `https://api.edamam.com/search?q=${protein}&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}&healh=${health}`;
    console.log(mealType);
    console.log(health);
    var recipe 

        fetch(mealUrl)
            .then(function(response){
                if (response.ok) {
                    response.json().then(function (data) {
                      
                        //random integer function
                        function getRandomInt() {
                            return Math.floor(Math.random() * 9) +1;   
                        }

                        //recipe data 
                        var randomInt = getRandomInt();
                        title = data.hits[randomInt].recipe.label;
                        var img = data.hits[randomInt].recipe.image;
                        var yield = data.hits[randomInt].recipe.yield;
                        var ingridents = data.hits[randomInt].recipe.ingredientLines;
                        var dietLabels = data.hits[randomInt].recipe.dietLabels;
                        var nutritionInfo = [
                            "<strong>Calories: </strong>"+ Math.round(data.hits[randomInt].recipe.calories),
                             "<strong>Chloesterol: </strong>"+ Math.round(data.hits[randomInt].recipe.totalNutrients.CHOLE.quantity) + data.hits[randomInt].recipe.totalNutrients.CHOLE.unit,
                             "<strong>Carbs: </strong>"+ Math.round(data.hits[randomInt].recipe.totalNutrients.CHOCDF.quantity) + data.hits[randomInt].recipe.totalNutrients.CHOCDF.unit,
                             "<strong>Sodium: </strong>" +  Math.round(data.hits[randomInt].recipe.totalNutrients.NA.quantity) + data.hits[randomInt].recipe.totalNutrients.NA.unit,
                             "<strong>Fat: </strong>" + Math.round(data.hits[randomInt].recipe.totalNutrients.FAT.quantity) + data.hits[randomInt].recipe.totalNutrients.FAT.unit,
                            "<strong>Sugar: </strong>" + Math.round(data.hits[randomInt].recipe.totalNutrients.SUGAR.quantity) + data.hits[randomInt].recipe.totalNutrients.SUGAR.unit
                        ];
                        
                        //append data to page
                        displayRecipe(title, img, yield, ingridents, dietLabels, nutritionInfo);
                    });
                } 
                else {
                        //modal error response status
                        var modal = document.createElement("div");
                        modal.setAttribute("class", "modal is-active is-mobile");
                        var modalBack = document.createElement("div");
                        modalBack.setAttribute("class", "modal-background");
                        var modalContent = document.createElement("div");
                        modalContent.setAttribute("class", "modal-content is-clipped");
                        modalContent.innerHTML = "Error: " + response.statusText;
                        var modalButton = document.createElement("button");
                        modalButton.setAttribute("class", "modal-close is-large");
                        modalButton.setAttribute("aria-label", "close");
                        modalButton.setAttribute("type", "submit");

                        modal.append(modalBack,modalContent,modalButton);
                        $("body").append(modal);

                        modalButton.addEventListener("click", function() {
                            modal.classList.remove('is-active')
                        });
                }
            })
            .catch(function(error){
                    //modal API unavailable
                    var modal = document.createElement("div");
                    modal.setAttribute("class", "modal is-active is-mobile");
                    var modalBack = document.createElement("div");
                    modalBack.setAttribute("class", "modal-background");
                    var modalContent = document.createElement("div");
                    modalContent.setAttribute("class", "modal-content is-clipped");
                    modalContent.innerHTML = "Unable to connect to recipe API" 
                    var modalButton = document.createElement("button");
                    modalButton.setAttribute("class", "modal-close is-large");
                    modalButton.setAttribute("aria-label", "close");
                    modalButton.setAttribute("type", "submit");

                    modal.append(modalBack,modalContent,modalButton);
                    $("body").append(modal);

                    modalButton.addEventListener("click", function() {
                        modal.classList.remove('is-active')
                    });
             });
};

// display recipe inforamtion
var displayRecipe = function (title, img, yield, ingridents, dietLabels, nutritionInfo) {
    $('#meal').css('display', 'block');
    clear();

    //add meal img to bpage 
    var mealImg = document.createElement("img");
    mealImg.setAttribute("src", img);
    mealImg.setAttribute("class", "meal-pick p-0")
    mealImageCon.append(mealImg);
    
    // add meal title 
    var mealTitle = document.createElement("h1");
    mealTitle.setAttribute("class", "title is-size-5-mobile is-size-3-desktop");
    mealTitle.innerHTML = title;
    mealTitleCon.append(mealTitle);

    //add yield to ingridents div
    var mealYield = document.createElement("p");
    mealYield.innerHTML = "Yield: " + yield;
    mealYieldCon.append(mealYield);

    //add indirgent to page ARRAY
    for (var i = 0; i<ingridents.length; i++) {
        var mealIngr = document.createElement("li");
        mealIngr.setAttribute("class", "is-lower-alpha column is-6");
        mealIngr.innerHTML = ingridents[i];
        mealIngr.setAttribute('is-flex-direction-row','flex-direction: row');
        mealIngredientsCon.appendChild(mealIngr);
    }
    // add diet labels to page ARRAY
    if (dietLabels.length === 0) {
        var dietLabelEl = document.createElement("span");
        dietLabelEl.innerHTML = "No diet labels exsits";
        dietLabelEl.setAttribute("class", "tag is-large is-light");
         dietLabelCon.append(dietLabelEl);

    } else {
        for (var i = 0; i<dietLabels.length; i++) {
            var dietLabelEl = document.createElement("span");
            dietLabelEl.setAttribute("class", "tag is-large is-light");
            dietLabelEl.setAttribute('is-flex-direction-column','flex-direction: column');
            dietLabelEl.setAttribute('is-justify-align-center', 'justify-align: center');
            dietLabelEl.setAttribute('is-flex-wrap-wrap', 'flex-wrap: wrap');
            dietLabelEl.innerHTML = dietLabels[i];
            dietLabelCon.append(dietLabelEl);
        }
    }    
    
    //add nutrion info to page 
    for (var i = 0; i<nutritionInfo.length; i++) {
        var nutrition = document.createElement("li");
        nutrition.innerHTML = nutritionInfo[i];
        nutritionInfoCon.append(nutrition);
    }


};

//fetch music 
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
         

    //music data appended to page
     var musicPlay = document.getElementById('audio');
     musicPlay.src = chosenMusic ;
     musicTitleCon.innerHTML = songTitle;
     musicArtistCon.innerHTML = songArtist;
     })

}

    
//save to local storage
var saveStorage = function(){
     localStorage.setItem(title, JSON.stringify(title))   
}   


//clear on refresh
var clear = function () {
    mealIngredientsCon.innerHTML = ""; 
    mealYieldCon.innerHTML = ""; 
    mealTitleCon.innerHTML = ""; 
    mealImageCon.innerHTML = ""; 
    dietLabelCon.innerHTML = "";
    nutritionInfoCon.innerHTML = "";
    musicTitleCon.innerHTML = "";

};

//event listeners for search click
randomButton.addEventListener("click", randomizeHandler);