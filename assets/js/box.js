var recipeCon = document.querySelector(".recipes-box");

recipeSave = function(){
    let arr= [];
    var getStore =  JSON.parse(localStorage.getItem('title')) || [] ;
    let localStorageItems = Object.keys(localStorage);
    arr.push(localStorageItems);
   let ul = document.createElement("ul");
   for (let i = 0; i < arr[0].length; i++) {
        let li = document.createElement("li");
        li.textContent = arr[0][i];
        recipeCon.appendChild(li);
        
   }
   
    //recipeCon.innerHTML=`<ul>${arr[0].map(i=>`<li>${i}</li>`)}</ul>`
   // localStorageItems.join("");
    //arr[0].map(i=>{
        //console.log(i);
   // })
    // localStorage.getItem('getStore', JSON.stringify(getStore));
    // console.log(storedRecipe);
    
 };
 
 recipeSave();

