let pressEnter = document.querySelector("#search-food");
pressEnter.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		searchButton.click()
	}
})

let input = document.getElementById('search-food')
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
	let response = await fetch(`https://api.edamam.com/search?app_id=${appId}&random=true&app_key=${appKey}&q=${userInput}`);
	let food = await response.json()
	getApi(food)

	// //tenor
	// let queryURL = `https://g.tenor.com/v1/search?q=${userInput}&client_key=my_test_app&key=LIVDSRZULELA&limit=8`
	// //make an https request fetch will return promise.
	// fetch(queryURL)
	// 	.then(response => response.json())
	// 	//will fire off when the server responds.
	// 	.then(function (response) {
	// 		console.log(response)
	// 		let results = response.results;
	// 		console.log(results[0].url)
	// 		let gifDiv = `<img class="card-img-top" alt="gif of your food" src="${results[0].media[0].gif.url}"></img>`
	// 		$("#images").prepend(gifDiv);
	// 	})
}

function getApi(food) {


	// Iva's Code start
	let recipeContainer = document.getElementById('food-container')
	recipeContainer.innerHTML = ''
	let recipeArr = [...food.hits]
	console.log(recipeArr);
	for (let i = 0; i < recipeArr.length; i++) {
		console.log(recipeArr[i]);
		let recipe = recipeArr[i].recipe
		console.log(recipe);
		let singleRecipeDiv = document.createElement('div')
		singleRecipeDiv.classList.add('single')

		let title = document.createElement('h5')
		title.textContent = recipe.label

		let img = document.createElement('img')
		img.src = recipe.image

		let type = document.createElement('p')
		type.textContent = ` Type: ${recipe.cuisineType} / ${recipe.dishType}`

		let dietLabel = document.createElement('p')

		recipe.dietLabels.length > 0 ? dietLabel.textContent = `Diet Label: ${recipe.dietLabels}` : dietLabel.textContent = `Diet Label: N/A`

		let calories = document.createElement('p')
		calories.textContent = "Calories: " + recipe.calories.toFixed()


		let recipeBtn = document.createElement('button')
		recipeBtn.textContent = 'View Recipe'
		recipeBtn.classList.add('recipeBtn')

		singleRecipeDiv.append(title, img, type, dietLabel, calories, recipeBtn)
		$("#food-container").prepend(singleRecipeDiv)
		// Ivas code finish 


		// Get the modal
		var modal = document.getElementById("myModal");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks on the button, open the modal
		recipeBtn.addEventListener("click", function () {
			console.log("wow")
			modal.style.display = "block";
		})

		// When the user clicks on <span> (x), close the modal
		span.addEventListener("click", function () {
			modal.style.display = "none";
		})

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}


 singleRecipeDiv.append(title,img,type,dietLabel,calories,recipeBtn)
 $("#food-container").prepend(singleRecipeDiv)
 // Ivas code finish
	input.value = ''
 }
	


	// document.querySelector("#foodContent").innerHTML = `
	// 	<div class="card" style="width: 18rem;">
	// 	<div id="images">
	// 	</div>
	// 	<div class="card-body">
	// 	<h5 class="card-title">${food.hits[0].recipe.label}</h5>
	// 	<p class="card-text">Calories: ${food.hits[0].recipe.calories.toFixed(0)}</p>
	// 	<p class="card-text">Cautions: ${food.hits[0].recipe.cautions[0]}</p>
	// 	<a href="${food.hits[0].recipe.url}" class="btn btn-primary" target="_blank">Check recipe</a>
	// 	</div>
	// 	</div>
	// `
}
