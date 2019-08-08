'use strict';
const inputSerie = document.querySelector('.fill');
const inputValue = document.querySelector('.value');
const button = document.querySelector('.button');
const series = document.querySelector('.space-series');
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
      let serie = '<div class="serie-space">';
      serie += '<ul class="serie" >';
      serie += '<li class="space-title ' + isFavouriteSerie(data[i].show.id) + '" id="' + data[i].show.id + '">' + data[i].show.name + '</li>';
      // añadir etiqueta imagen (poner foto por defecto si no tiene la serie)
      if(data[i].show.image === null){
        serie += '<li class="space-image"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/></li>';
      }else{
        serie += '<li class="space-image"><img src="' + data[i].show.image.medium + '"/></li>';
      }
      serie += '<li class="reference">' + data[i].show.id + '</li>';
      serie += '</ul>';
      serie += '</div>';
      series.innerHTML += serie;
    }

    for(let myFav of document.querySelectorAll('.noLike')){
      myFav.addEventListener('click', favSav);
    }
  })
  .catch(function() {
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

  let favouriteIdList = localStorage.getItem('favouriteIdList');
  if (favouriteIdList === null || favouriteIdList === undefined){
    favouriteIdList = [event.target.id];
  }else{
    favouriteIdList = JSON.parse(favouriteIdList);
    favouriteIdList.push(event.target.id);
  }

  localStorage.setItem( 'favouriteIdList', JSON.stringify(favouriteIdList));
}

function isFavouriteSerie(serieId){
  let favouriteId = localStorage.getItem('favouriteIdList');
  if (favouriteId === null || favouriteId === undefined){
    return 'noLike';
  }else{
    favouriteId = JSON.parse(favouriteId);
    if(favouriteId.includes(serieId + '')) {
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

const favouriteSpace = document.querySelector('.favourite-Space');
// const contentTitle = document.createTextNode(`${data[i].show.name}`);
