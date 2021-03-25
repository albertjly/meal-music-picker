//music api variables
//var musicProtein = document.getElementById("protein") 



//fetch music
fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=chicken" , {
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
    var chosenMusic = fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=chicken" , {
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
    musicPlay.src = 'https://cdns-preview-b.dzcdn.net/stream/c-b805a55caedd124afe51f51315428e09-3.mp3';
    
    }