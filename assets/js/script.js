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
var gifDis = ""
//fetch data from the API
async function sendApiRequest() {
	let userInput = document.querySelector("#search-food").value
	gifDis = userInput
	let appId = "610e31e3"
	let appKey = "9ccc32eb1e19081d0c574bf4082402cf"
	let response = await fetch(`https://api.edamam.com/search?app_id=${appId}&random=true&app_key=${appKey}&q=${userInput}`);
	let food = await response.json()
	getApi(food)
	return gifDis
}

function getApi(food) {
	let recipeContainer = document.getElementById('food-container')
	recipeContainer.innerHTML = ''
	// copy the array of recipes and create elements to display each one
	let recipeArr = [...food.hits]
	for (let i = 0; i < recipeArr.length; i++) {
		let recipe = recipeArr[i].recipe
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

		// let likeBtn = document.createElement('button')
		// likeBtn.textContent = 'Like'
		// likeBtn.classList.add('likeBtn')

		// likeBtn.addEventListener('click', function () {
		// 	likeBtn.classList.toggle('liked')
		// 	if (likeBtn.innerHTML === 'Like') {
		// 		likeBtn.innerHTML = 'Liked'
		// 	}
		// 	else if (likeBtn.innerHTML === 'Liked') {
		// 		likeBtn.innerHTML = 'Like'
		// 	}
		// })

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
			let queryURL = `https://g.tenor.com/v1/search?q=${gifDis}` +
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
				<img class="gif row" src="${randomGif}"></img>
				<a class="visit-recipe btn btn-info row" href="${recipeUrl}">Visit recipe: ${title.textContent}</a>
				`)
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
		singleRecipeDiv.append(imgContainer, titleDiv, dataContainer,
			 // likeBtn, 
			 recipeBtn)
		$("#food-container").prepend(singleRecipeDiv)
		// Ivas code finish
		input.value = ''
	}
}

// Add dark mode

//checks localSorage
let body = document.querySelector('body')
let darkBtn = document.querySelector('.fas')
let lightBtn = document.querySelector('.fa')
let header = document.querySelector('header h1')
let logo = document.querySelector('.logo')

//checks localSorage
let darkOn = localStorage.getItem('darkOn')


// allows user to stay in dark or light mode if choosen in previous site visit
if(darkOn === 'enabled') {
 body.classList.add('dark')
	header.style.color = 'white'
	//darkBtn.style.color = 'white'
	lightBtn.style.visibility = 'visible'
	lightBtn.style.color = 'white'
	darkBtn.classList.add('visibility')
 localStorage.setItem('darkOn','enabled')
}else{
 body.classList.remove('dark')
 header.style.color = 'darkgray'
	lightBtn.style.visibility = 'hidden'
	darkBtn.style.color = 'darkgray'
 localStorage.setItem('darkOn',null)
}

darkBtn.addEventListener('click',function(e) {
	e.preventDefault()
	 // checks and gets from localStorage
 darkOn = localStorage.getItem('darkOn')

 if(darkOn !== 'enabled') {
  console.log('dark on');
  body.classList.add('dark')
		header.style.color = 'white'
  //darkBtn.style.color = 'white'
		darkBtn.classList.add('visibility')
		lightBtn.style.visibility = 'visible'
		lightBtn.style.color = 'white'
		logo.style.color = 'white'
  localStorage.setItem('darkOn','enabled')
 }

})

lightBtn.addEventListener('click',function(e) {
	e.preventDefault()

	 // checks and gets from localStorage
 darkOn = localStorage.getItem('darkOn')

	if(darkOn == 'enabled') {
	 body.classList.remove('dark')
			header.style.color = 'darkgray'
			darkBtn.classList.remove('visibility')
   darkBtn.style.color = 'darkgray'
			lightBtn.style.visiility = 'hidden'
   localStorage.setItem('darkOn',null)
	}
})