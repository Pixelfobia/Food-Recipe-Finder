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
var userInput = ""
//fetch data from the API
async function sendApiRequest() {
	let userInput = document.querySelector("#search-food").value
	let appId = "610e31e3"
	let appKey = "9ccc32eb1e19081d0c574bf4082402cf"
	let response = await fetch(`https://api.edamam.com/search?app_id=${appId}&random=true&app_key=${appKey}&q=${userInput}`);
	let food = await response.json()
	getApi(food)
	return userInput
}

function getApi(food) {


	// Iva's Code start
	let recipeContainer = document.getElementById('food-container')
	recipeContainer.innerHTML = ''
	let recipeArr = [...food.hits]
	// console.log(recipeArr);
	for (let i = 0; i < recipeArr.length; i++) {
		// console.log(recipeArr[i]);
		let recipe = recipeArr[i].recipe
		// console.log(recipe);
		let singleRecipeDiv = document.createElement('div')
		singleRecipeDiv.classList.add('single')

		let title = document.createElement('h4')
		title.textContent = recipe.label

		let titleDiv = document.createElement('div')
		titleDiv.classList.add('titleDiv')
		titleDiv.append(title)

		let imgContainer = document.createElement('div')
		imgContainer.classList.add('imgContainer')

		let img = document.createElement('img')
		img.src = recipe.image
		imgContainer.append(img)

		let dataContainer = document.createElement('div')
		dataContainer.classList.add('dataContainer')

		let type = document.createElement('p')
		type.textContent = ` Type: ${recipe.cuisineType} / ${recipe.dishType}`

		let dietLabel = document.createElement('p')
		recipe.dietLabels.length > 0 ? dietLabel.textContent = `Diet Label: ${recipe.dietLabels}` : dietLabel.textContent = `Diet Label: N/A`

		let calories = document.createElement('p')
		calories.textContent = "Calories: " + recipe.calories.toFixed()

		dataContainer.append(type, dietLabel, calories)

		let recipeBtn = document.createElement('button')
		recipeBtn.textContent = 'View Recipe'
		recipeBtn.classList.add('recipeBtn')
		// Ivas code finish 

		let recipeUrl = recipe.url

		// Get the modal
		var modal = document.getElementById("myModal");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close");

		// When the user clicks on the button, open the modal
		recipeBtn.addEventListener("click", function () {

			//tenor
			let queryURL = `https://g.tenor.com/v1/search?q=${title.textContent}`+
			`&client_key=my_test_app&key=LIVDSRZULELA&limit=8`
			//make an https request fetch will return promise.
			fetch(queryURL)
				.then(response => response.json())
				//will fire off when the server responds.
				.then(function (response) {
					let results = response.results;
					let randomNumber = Math.floor(Math.random() * 8)
					let randomGif = results[randomNumber].media[0].gif.url
					$(".gifDiv").empty()
					$(".gifDiv").append(`
						<a class="visit-recipe btn btn-info col-3" href="${recipeUrl}">Visit recipe site</a>
						<img class="gif col-6" src="${randomGif}"></img>
						<a class="add-favourite btn btn-info col-3">Add to favourites</a>
					`)
					$(".add-favourite").on("click", function() {
						addFavourite()
					})
				})
			let recipePreview = $(".recipe-preview")
			recipePreview.attr("src", `${recipe.url}`)
			modal.style.display = "block";
			$(".gif")
		})

		// When the user clicks on <span> (x), close the modal
		$(span).on("click", function () {
			modal.style.display = "none";
		})

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		singleRecipeDiv.append(imgContainer, titleDiv, dataContainer, recipeBtn)
		$("#food-container").prepend(singleRecipeDiv)
		// Ivas code finish
		input.value = ''
	}


}

function addFavourite() {
	console.log("wow")
}

// Get the modal2
var modal2 = document.getElementById("favourite-recipes");

// Get the <span> element that closes the modal2
var span2 = document.getElementsByClassName("close2");

// Get favourite button
var favouriteBtn = document.getElementsByClassName("favourite-btn")

// When the user clicks on the button, open the modal2
$(favouriteBtn).on("click", function () {
	if (localStorage.length === 0) {
		$(".recipesDiv").empty()
		$(".recipesDiv").append(`<p>No recipes saved yet</p>`)
	}
	modal2.style.display = "block";
})

// When the user clicks on <span> (x), close the modal2
$(span2).on("click", function () {
	modal2.style.display = "none";
})


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

