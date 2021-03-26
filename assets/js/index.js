var protien = document.querySelector("#protein-search");


//fetch music
fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + protein, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "745e72bfb2mshcd1b1af9ded37c3p1ca71djsnfeb89c9db301",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

// variable for music chosen
window.onload=function(){    
    var chosenMusic = fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + protein , {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "745e72bfb2mshcd1b1af9ded37c3p1ca71djsnfeb89c9db301",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

    //append to html
    var musicPlay = document.getElementById('audio');
    musicPlay.src = chosenMusic;
    
    }