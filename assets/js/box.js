var recipeCon = document.querySelector(".recipes-box");

recipeSave = function(){
    let arr= []
    var getStore =  JSON.parse(localStorage.getItem('title')) || [] ;
    let localStorageItems = Object.keys(localStorage)
    arr.push(localStorageItems)
    console.log(arr)
    recipeCon.innerHTML=`<ul>${arr[0].map(i=>`<li>${i}</li>`)}</ul>`
    // localStorage.getItem('getStore', JSON.stringify(getStore));
    // console.log(storedRecipe);
    
 }
 
 recipeSave();

