let searchButton = document.querySelector("#search");

// Add an event to search Edaman
searchButton.addEventListener("click", (event) => {
	event.preventDefault();
	sendApiRequest()
})

//fetch data from the API
async function sendApiRequest() {
	let userInput = document.querySelector("#search-food").value
	let appId = "610e31e3"
	let appKey = "9ccc32eb1e19081d0c574bf4082402cf"
	let response = await fetch(`https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${userInput}`);
	let food = await response.json()
	getApi(food)

	//tenor
	let queryURL = `https://g.tenor.com/v1/search?q=${userInput}&client_key=my_test_app&key=LIVDSRZULELA&limit=8`
	//make an https request fetch will return promise.
	fetch(queryURL)
		.then(response => response.json())
		//will fire off when the server responds.
		.then(function (response) {
			console.log(response)
			let results = response.results;
			console.log(results[0].url)
			let gifDiv = `<img class="img-top" alt="gif of your food" src="${results[0].media[0].gif.url}"></img>`
			$("#images").prepend(gifDiv);
		})
}

function getApi(food) {
	document.querySelector("#foodContent").innerHTML = `
		<div class="card" style="width: 18rem;">
  		<div id="images">
		</div>
  		<div class="card-body">
    	<h5 class="card-title">${food.hits[0].recipe.label}</h5>
    	<p class="card-text">Calories: ${food.hits[0].recipe.calories.toFixed(0)}</p>
		<p class="card-text">Cautions: ${food.hits[0].recipe.cautions[0]}</p>
    	<a href="${food.hits[0].recipe.url}" class="btn btn-primary" target="_blank">Check recipe</a>
  		</div>
		</div>
	`
}