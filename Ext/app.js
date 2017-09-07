window.addEventListener('load', function(){
  var url = 'https://api.punkapi.com/v2/beers';

  makeRequest(url, function(){
    if (this.status !== 200) return; // Request failure.
    var beers = JSON.parse(this.responseText);
    render(beers);
  });
});

// Functions

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var render = function(beers){

  var storedBeer = localStorage.getItem('selectedBeer');
  var beerToDisplay = null;

  if (storedBeer){
    beerToDisplay = JSON.parse(storedBeer);
    console.log(beerToDisplay);
    var select = document.querySelector('#menu');
    console.log(select);
    console.log(beerToDisplay.id);
    select.selectedIndex = beerToDisplay.id;
    console.log(select.selectedIndex);
  } else {
    beerToDisplay = beers[0];
  }

  populateMenu(beers);
  displayBeer(beerToDisplay);
}

var createListItem = function(beer, ul){
  
  ul.removeChild(ul.childNodes[0]);
  var li = document.createElement('li')
  var ingredients = '';

  beer.ingredients.malt.forEach(function(ingredient, index){
    var amount = ' (' + ingredient.amount.value + ingredient.amount.unit + ')';
    ingredients += '<li>' + ingredient.name + amount + '</li>';
  });

  li.innerHTML = '<p id="name">' + beer.name + '</p><p>ABV: ' + beer.abv + '%</p><p id="tagline">' + beer.tagline + '</p><p><img src="' + beer.image_url + '" alt="' + beer.name + '" height="10%" width="10%"</p><p>Ingredients:<ul id="ingredients">' + ingredients + '</ul></p><hr>';
  ul.appendChild(li);
}

var populateMenu = function(beers){
  var select = document.querySelector('#menu');
  beers.forEach(function(beer, index){
    createMenuItem(beer, index, select);
  });

  select.addEventListener('change', function(event){
    var index = this.value;
    var beer = beers[index];

    displayBeer(beer);

    localStorage.setItem('selectedBeer', JSON.stringify(beer));
  })
}

var createMenuItem = function(beer, index, select){
  var option = document.createElement('option');
  option.value = index;
  option.text = beer.name;
  select.appendChild(option);
}

var displayBeer = function(beer){
  var ul = document.querySelector('#beers');
  createListItem(beer, ul);
}