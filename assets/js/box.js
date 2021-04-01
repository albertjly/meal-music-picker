//Dom Element
var recipeCon = document.querySelector(".recipes-box");



//Function to save recipes and append to page
recipeSave = function(){
    let arr= [];
    var getStore =  JSON.parse(localStorage.getItem('title')) || [] ;
    let localStorageItems = Object.keys(localStorage);
    arr.push(localStorageItems);
    let ul = document.createElement("ul");
    for (let i = 0; i < arr[0].length; i++) {
        let li = document.createElement("li");
        li.setAttribute("class", "column is-12 p-1 m-2 fas fa-drumstick-bite");
        li.setAttribute("style", "color: #D2692E" );
        li.textContent = arr[0][i];
        recipeCon.appendChild(li);
    }
};

recipeSave();