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
  displayList(beers);
}

var displayList = function(beers){
  var ul = document.querySelector('#beers');
  beers.forEach(function(beer){
    createListItem(beer, ul);
  });
}

var createListItem = function(beer, ul){
  var li = document.createElement('li')
  var ingredients = '';

  beer.ingredients.malt.forEach(function(ingredient, index){
    var amount = ' (' + ingredient.amount.value + ingredient.amount.unit + ')';
    ingredients += '<li>' + ingredient.name + amount + '</li>';
  });

  li.innerHTML = '<p id="name">' + beer.name + '</p><p>ABV: ' + beer.abv + '%</p><p id="tagline">' + beer.tagline + '</p><p><img src="' + beer.image_url + '" alt="' + beer.name + '" height="10%" width="10%"</p><p>Ingredients:<ul id="ingredients">' + ingredients + '</ul></p><hr>';
  ul.appendChild(li);
}

// var populateMenu = function(beers){
//   var select = document.querySelector('#beers');
//   beers.forEach(function(beer, index){
//     createMenuItem(beer, index, select);
//   });
// }

// var createListItem = function(beer, index, select){
//   var option = document.createElement('li')
//   option.value = beer.index;
//   option.text = beer.name;
//   select.appendChild(li);
// }