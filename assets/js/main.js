// const results = document.querySelector('#results')
const searchResults = document.querySelector('.searchResults')

// CAROUSEL 

function getPopularCocktails(){

  fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php')
  .then(res => res.json()) 
  .then(data => {
    const carouselContainer = document.querySelector('#carouselWrapper')

    data.drinks.slice(0, 10).forEach(cocktail => {
      const cocktailDiv = document.createElement('div');
      cocktailDiv.classList.add('cocktailCarousel');
      cocktailDiv.dataset.idDrink = cocktail.idDrink; // add drink ID as data attribute


      const cocktailImage = document.createElement('img');
      cocktailImage.src = cocktail.strDrinkThumb;

      const cocktailName = document.createElement('h4');  
      cocktailName.textContent = cocktail.strDrink;

      cocktailDiv.addEventListener('click', () => {
        convertFromDrinkId(cocktail.idDrink)
          .then(data => {
            showResults(data);
          })
          .catch(err => {
            console.log(`error ${err}`);
          });
      });

      cocktailDiv.appendChild(cocktailImage);
      cocktailDiv.appendChild(cocktailName);

      carouselContainer.appendChild(cocktailDiv);
    });
  })
  .catch(err => {
    console.log(`error ${err}`);
  });
}

getPopularCocktails();






// Updates Cocktail Results To The Drinks ID


// document.querySelector('.searchResults').addEventListener('click', (event) => {
//   const idDrink = event.target.dataset.idDrink;
//   if (idDrink) {
//     showResults(idDrink);
//   }
// });

function convertFromDrinkId(drinkId) {
  return fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}


// SEARCH RESULTS

function showResults(data){
  document.querySelector('#cocktailSearchResult').scrollIntoView({
    behavior: 'smooth',
  });



document.querySelector('#cocktailSearchResult').innerHTML = '';




// Cocktail Name

  const cocktailName = data.drinks[0].strDrink
  const cocktailNameWithoutPunctuation = cocktailName.replace(/[^\w\s]/g, '');
  const cocktailNameElement = document.createElement('h2');
  cocktailSearchResult.appendChild(cocktailNameElement)
  cocktailNameElement.innerText = cocktailNameWithoutPunctuation;

// Cocktail Image

  const cocktailImg = data.drinks[0].strDrinkThumb
  const cocktailImgElement = document.createElement('img');
  cocktailSearchResult.appendChild(cocktailImgElement);
  cocktailImgElement.src = cocktailImg;

  cocktailImgElement.style

// Cocktail Measurement & Ingredients

  const ingredientsElement = document.createElement('ul')
  cocktailSearchResult.appendChild(ingredientsElement)

  for (let i = 1; i <= 15; i++) {
    const ingredient = data.drinks[0]['strIngredient' + i];
    const measure = data.drinks[0]['strMeasure' + i];

  if (ingredient && ingredient !== 'null' && measure && measure !== 'null') {
    const liElement = document.createElement('li');
    liElement.innerText = measure.toUpperCase() + ' ' + ingredient.toUpperCase();
    ingredientsElement.appendChild(liElement);
  }}

// Cocktail Instructions

  const cocktailRecipe = data.drinks[0].strInstructions
  const cocktailRecipeWithoutPunctuation = cocktailRecipe.replace(/[^\w\s]/g, '');
  const cocktailRecipeElement = document.createElement('h3');
  cocktailSearchResult.appendChild(cocktailRecipeElement)
  cocktailRecipeElement.innerText = cocktailRecipeWithoutPunctuation;
}








// Search for cocktails by name:

document.querySelector('#byName').addEventListener('click', getCocktailByName)

function getCocktailByName(){
  // const searchResults = document.querySelector('.searchResults')
  document.querySelector('.searchResults').innerHTML = ''; // clear previous search
  document.querySelector('#cocktailSearchResult').innerHTML = '';
  searchResults.scrollIntoView({
    behavior: 'smooth',
  });

  let cocktail = document.querySelector('.searchByName').value

  if (!cocktail) {
    document.querySelector('.result').innerText = '';
    return;
  }

  fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${cocktail}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      if (data.drinks) {
        console.log(data.drinks.length)
        document.querySelector('.result').innerText = `We have ${data.drinks.length} cocktails that match:`
        data.drinks.forEach(obj => {
          console.log(obj.strDrink)
          const li = document.createElement('li')
          li.textContent = obj.strDrink

          li.addEventListener('click', () => {
            showResults({ drinks: [obj] })
          })
          
          searchResults.appendChild(li)


        })
      } else {
        document.querySelector('.result').innerText = 'We have no cocktails that match your search, please try again.'
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}



// Search for cocktails by ingredients:

document.querySelector('#byIngredient').addEventListener('click', getCocktailByIngredient)
  

  function getCocktailByIngredient(){
    document.querySelector('.searchResults').innerHTML = ''; 
    document.querySelector('#cocktailSearchResult').innerHTML = '';
    searchResults.scrollIntoView({
      behavior: 'smooth',
    });

    let ingredient = document.querySelector('.searchByIngredient').value
  
    if (!ingredient) {
      document.querySelector('.result').innerText = '';
      return;
    }
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredient}`)
      .then(res => res.json()) 
      .then(data => {
        console.log(data)


        if (data.drinks) {
          console.log(data.drinks.length)
          document.querySelector('.result').innerText = `We have ${data.drinks.length} cocktails that include ${ingredient}:`
          data.drinks.forEach(obj => {
            console.log(obj.strDrink)
            const li = document.createElement('li')
            li.textContent = obj.strDrink
  
            li.addEventListener('click', () => {
              showResults({ drinks: [obj] })
            })
            
            searchResults.appendChild(li)

  
          })
        } else {
          document.querySelector('.result').innerText = `We have no cocktails that include ${ingredient}, please try again.`
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  }
  
  

// Random cocktail

document.querySelector('#random').addEventListener('click', getRandomCocktail)

function getRandomCocktail(){
  document.querySelector('.result').innerHTML ='';
  document.querySelector('.searchResults').innerHTML ='';

  fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php')
  .then(res => res.json())
  .then(data => {

    console.log(data)
    showResults(data)
  })

    .catch(err => {
    console.log(`error ${err}`)
  })
}




 


(function($) {

	var $window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 5

		};

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1367px',  '1680px' ],
			large:    [ '981px',   '1366px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav Panel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					resetScroll: true,
					resetForms: true,
					side: 'top',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax background.

		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.locus_parallax', function() {

					// Adjust background position.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						$bg.css('background-position', 'top left, center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.locus_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						if (breakpoints.active('<=medium')) {

							$body.css('background-position', 'top left, top center');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.locus_parallax');

				})
				.trigger('resize.locus_parallax');

		}

})(jQuery);