var protien = document.getElementById(".protein-option");
var selectedProtein = protein.options[protein.selectedIndex].value;





// variable for music chosen
window.onload=function(){    
   fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + selectedProtein , {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "745e72bfb2mshcd1b1af9ded37c3p1ca71djsnfeb89c9db301",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then((response) => {
        let chosenMusic = response.data[2].preview;
        //append to html
    var musicPlay = document.getElementById('audio');
    musicPlay.src = chosenMusic ;

    })
    
    }