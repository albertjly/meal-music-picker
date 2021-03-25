//music api variables
//var musicProtein = document.getElementById("protein") //this needs to be changed to match html



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

//append to html
fetch();