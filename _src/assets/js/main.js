'use strict';
const inputValue = document.querySelector('.value');
const searchButton = document.querySelector('.search-button');
const series = document.querySelector('.space-series');
const favouriteSpace = document.querySelector('.favourite-Space');
const reset = document.querySelector('.remove');
const collapsable = document.querySelector('.favourite-Space-title');
const favouritesSaved = document.querySelector('.my-favs');
const url = 'http://api.tvmaze.com/search/shows?q=';

//función hace petición a la api con el valor introducido
// por el usuario
function serching(){
  fetch(url + inputValue.value)
  .then(handleErrors)
  .then (response => response.json())
  .then (data => {
    // Bucle para recorrer la info devuelta (data) y
    // pintar en el espacio de "series" las imágenes y títulos
    series.innerHTML='';

    for (let i = 0; i < data.length; i++){

      let serieInfo = {
        id: data[i].show.id,
        name: data[i].show.name,
      };
      if(data[i].show.image === null){
        serieInfo.imageMedium = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
      }else{
        serieInfo.imageMedium = data[i].show.image.medium;
      }

      // codifica el objeto "serieInfo" para guardarlo
      series.innerHTML += generateSerieContent(serieInfo);
    }

    updateFavoriteClickEvent();
  })
  .catch(function(error) {
    console.log(error);
    series.innerHTML = 'Vuelve a intentarlo más tarde, se ha producido un error';
  });
}
// Al clickar sobre el botón, busca
searchButton.addEventListener('click', serching);

// Al pulsar la tecla 13 (enter) también busca. Esto se ejecuta en la función "serching"
inputValue.addEventListener('keyup', event => {
  if (event.keyCode === 13){
    serching();
  }
});

// evento, cuando clickas, cambias de una clase a otra (favoritos). Esta clase es llamada
// dentro de la función serching
function favSav(event){
  let favouriteSerieList = JSON.parse(localStorage.getItem('favouriteSerieListStored'));
  let listaFavoritosContieneSerie = false;
  if(favouriteSerieList !== null && favouriteSerieList !== undefined){
    listaFavoritosContieneSerie = favouriteSerieList.includes(event.target.id);
  }

  if (!listaFavoritosContieneSerie){
    //logica agregar favorito
    event.target.classList.add('like');
    event.target.classList.remove('noLike');

    if (favouriteSerieList === null || favouriteSerieList === undefined){
      favouriteSerieList = [event.target.id];
    }else{
      favouriteSerieList.push(event.target.id);
    }
  }else{
    // logica borrar favorito.
    const seriesToUnfavorite = document.querySelectorAll("[id='" + event.target.id + "']");
    for(let serieToUnfavorite of seriesToUnfavorite){
      serieToUnfavorite.classList.add('noLike');
      serieToUnfavorite.classList.remove('like');
    }
    //
    if (favouriteSerieList !== null || favouriteSerieList !== undefined){
      favouriteSerieList = favouriteSerieList.filter(function(value, index, arr){
        return value !== event.target.id;
      });
    }
  }


  localStorage.setItem( 'favouriteSerieListStored', JSON.stringify(favouriteSerieList));
  showFavourites();
}

// Función id. Los id guardados en el localStorage
// los recoge de nuevo para volver a pintarlos y les pone la clase correspondiente.
function isFavouriteSerie(serieInfo){
  let favouriteId = localStorage.getItem('favouriteSerieListStored');
  if (favouriteId === null || favouriteId === undefined){
    return 'noLike';
  }else{
    favouriteId = JSON.parse(favouriteId);
    if(favouriteId.includes(serieInfo)) {
      return 'like';
    }else{
      return 'noLike';
    }
  }
}


// función que da una respuesta errónea del servidor. A esta función la
// llamamos en "serching"
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function showFavourites(){
  favouriteSpace.innerHTML = '';
  const favouriteSerieList = JSON.parse(localStorage.getItem( 'favouriteSerieListStored'));
  if(favouriteSerieList != undefined && favouriteSerieList != null){
    for (let favouriteSerie of favouriteSerieList){
      const favouriteSerieInfo = JSON.parse(decodeURIComponent(favouriteSerie));
      favouriteSpace.innerHTML += generateSerieContent(favouriteSerieInfo);
    }
  }
  updateFavoriteClickEvent();
}
showFavourites();

// función generar estructura para el html
function generateSerieContent(serieInfo){
  const serieInfoStr = encodeURIComponent(JSON.stringify(serieInfo));
  let serie = '<div class="serie-space">';
  serie += '<ul class="serie" >';
  serie += '<li class="space-title ' + isFavouriteSerie(serieInfoStr) + '" id="' + serieInfoStr + '">' + serieInfo.name + '</li>';
  // añadir etiqueta imagen (poner foto por defecto si no tiene la serie)
  serie += '<li class="space-image"><img src="' + serieInfo.imageMedium + '"/></li>';
  serie += '<li class="reference">' + serieInfo.id + '</li>';
  serie += '</ul>';
  serie += '</div>';

  return serie;
}

function removing(){
  localStorage.clear();
  showFavourites();
}

reset.addEventListener('click', removing);

function updateFavoriteClickEvent(){
  for(let serieNoLike of document.querySelectorAll('.noLike')){
    serieNoLike.addEventListener('click', favSav);
  }

  for(let myFav of document.querySelectorAll('.like')){
    myFav.addEventListener('click', favSav);
  }
}

function openFavourites(){
  if(favouritesSaved.classList.contains('hidden')){
    favouritesSaved.classList.remove('hidden');
  }
}


collapsable.addEventListener('click', openFavourites);
