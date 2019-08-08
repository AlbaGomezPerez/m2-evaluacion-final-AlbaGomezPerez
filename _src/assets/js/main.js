'use strict';
const inputSerie = document.querySelector('.fill');
const inputValue = document.querySelector('.value');
const button = document.querySelector('.button');
const series = document.querySelector('.space-series');
const favouriteSpace = document.querySelector('.favourite-Space');
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

    for(let myFav of document.querySelectorAll('.noLike')){
      myFav.addEventListener('click', favSav);
    }
  })
  .catch(function(error) {
    console.log(error);
    series.innerHTML = 'Vuelve a intentarlo más tarde, se ha producido un error';
  });
}
// Al clickar sobre el botón, busca
button.addEventListener('click', serching);
// Al pulsar la tecla 13 (enter) también busca. Esto se ejecuta en la función "serching"
inputValue.addEventListener('keyup', event => {
  if (event.keyCode === 13){
    serching();
  }
});

// evento, cuando clickas, cambias de una clase a otra (favoritos). Esta clase es llamada
// dentro de la función serching
function favSav(event){
  event.target.classList.add('like');
  event.target.classList.remove('noLike');

  let favouriteSerieList = localStorage.getItem('favouriteSerieListStored');
  if (favouriteSerieList === null || favouriteSerieList === undefined){
    favouriteSerieList = [event.target.id];
  }else{
    favouriteSerieList = JSON.parse(favouriteSerieList);
    favouriteSerieList.push(event.target.id);
  }

  localStorage.setItem( 'favouriteSerieListStored', JSON.stringify(favouriteSerieList));
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
  const favouriteSerieList = JSON.parse(localStorage.getItem( 'favouriteSerieListStored'));
  for (let favouriteSerie of favouriteSerieList){
    const favouriteSerieInfo = JSON.parse(decodeURIComponent(favouriteSerie));
    console.log(favouriteSerieInfo);
    favouriteSpace.innerHTML += generateSerieContent(favouriteSerieInfo);
  }
}
showFavourites();

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

