
$(document).ready(function () {

	let searchButton = document.querySelector("#search");

	// Add an event to search Edaman
	searchButton.addEventListener("click", (event) => {
		event.preventDefault();
		console.log("searching...")
		sendApiRequest()
	})

	//fetch data from the API
	async function sendApiRequest() {
		let userInput = document.querySelector("#search-food").value
		let appId = "610e31e3"
		let appKey = "9ccc32eb1e19081d0c574bf4082402cf"
		let response = await fetch(`https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${userInput}`);
		console.log(response)
		let food = await response.json()
		console.log(food)
		getApi(food)

		//giphy
		let queryURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}` +
			"&api_key=hwqLy9fPptM2iLrGxVgrgPONMjFtOf3S&limit=5";
		//make an https request fetch will return promise.
		$.ajax({
			url: queryURL,
			method: "GET"
		})
			//will fire off when the server responds.
			.then(function (response) {
				let results = response.data;
				console.log(results)
				for (let i = 0; i < results.length; i++) {
					let gifDiv = $("<img>").addClass("card-img-top");

					$("#images").prepend(gifDiv);
				}
			}
				//we have access to the data.
				//	.then(function (response) {
				//	let imageURL = response.data.images.original.url;
				//let foodImage = $("<img>").addClass(card-img-top);
				//foodImage.attr("src", imageURL);
				//foodImage.attr("alt", "");

				//$("#images").prepend(foodImage);
			)
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
	// Giphy
	//$("#search").on("click", function () {
	//		let queryURL = "https://api.giphy.com/v1/gifs/search?q=${userInput}" + &api_key=hwqLy9fPptM2iLrGxVgrgPONMjFtOf3S&limit=5";

	//make an https request fetch will return promise.
	//	fetch(queryURL)
	//will fire off when the server responds.
	//	.then(response => response.json())
	//we have access to the data.
	//.then(function (response) {
	//let imageURL = response.data.images.original.url;
	//let foodImage = $("<img>");
	//foodImage.attr("src", imageURL);
	//foodImage.attr("alt", "");

	//$("#images").prepend(foodImage);
	//})
	//})
});