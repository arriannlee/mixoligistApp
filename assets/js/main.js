
// cocktail api

document.querySelector('.cocktailButton').addEventListener('click', getCocktail)

function getCocktail(){
  let cocktail = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks[0])
      document.querySelector('.cocktailName').innerText = data.drinks[0].strDrink
      document.querySelector('.cocktailImg').src = data.drinks[0].strDrinkThumb
      document.querySelector('.ingredient1').innerText = data.drinks[0].strIngredient1
      document.querySelector('.ingredient2').innerText = data.drinks[0].strIngredient2
      document.querySelector('.ingredient3').innerText = data.drinks[0].strIngredient3
      document.querySelector('.ingredient4').innerText = data.drinks[0].strIngredient4
      document.querySelector('.ingredient5').innerText = data.drinks[0].strIngredient5
      document.querySelector('.ingredient6').innerText = data.drinks[0].strIngredient6
      document.querySelector('.ingredient7').innerText = data.drinks[0].strIngredient7
      document.querySelector('.ingredient8').innerText = data.drinks[0].strIngredient8
      document.querySelector('.ingredient9').innerText = data.drinks[0].strIngredient9
      document.querySelector('.ingredient10').innerText = data.drinks[0].strIngredient10
      document.querySelector('.ingredient11').innerText = data.drinks[0].strIngredient11
      document.querySelector('.ingredient12').innerText = data.drinks[0].strIngredient12
      document.querySelector('.ingredient13').innerText = data.drinks[0].strIngredient13
      document.querySelector('.ingredient14').innerText = data.drinks[0].strIngredient14
      document.querySelector('.ingredient15').innerText = data.drinks[0].strIngredient15
      document.querySelector('.measure1').innerText = data.drinks[0].strMeasure1
      document.querySelector('.measure2').innerText = data.drinks[0].strMeasure2

      document.querySelector('.instructions').innerText = data.drinks[0].strInstructions

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}























//date picker

datePicker.max = new Date().toISOString().split("T")[0];

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