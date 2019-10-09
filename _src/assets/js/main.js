'use strict';
// llamada a todas las constantes
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
// pintar en el espacio de "series" las imágenes y títulos
    series.innerHTML='';
// Bucle para recorrer la info devuelta (data). Empiezo en el elemento 0,
// y añado cada vez uno.
    for (let i = 0; i < data.length; i++){
  // variable que hace referencia al id, el name y la imagen.
      let serieInfo = {
        id: data[i].show.id,
        name: data[i].show.name,
        status: data[i].show.status,
      };
      if(data[i].show.image === null){
        serieInfo.imageMedium = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
      }else{
        serieInfo.imageMedium = data[i].show.image.medium;
      }

      // Dentro de series (antes estaba vacio) meto la variable, codificada
      // más adelante necesito esa info codificada.
      series.innerHTML += generateSerieContent(serieInfo);
    }

    // función ejecutada más adelante. Actulizar info favoritos.
    updateFavoriteClickEvent();
  })

  // mensaje para cuando de un error el servidor.
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

// función, evento click:
// variable
// -se parsea la info y se guarda en localStorage
// -cambias de una clase a otra (favoritos).
// -Dependiendo de la clase, éste se añade o se elimina de favoritos
function favSav(event){
  let favouriteSerieList = JSON.parse(localStorage.getItem('favouriteSerieListStored'));
  let listaFavoritosContieneSerie = false;
  if(favouriteSerieList !== null && favouriteSerieList !== undefined){
    listaFavoritosContieneSerie = favouriteSerieList.includes(event.target.id);
  }

  if (!listaFavoritosContieneSerie){
    //agregar favorito
    event.target.classList.add('like');
    event.target.classList.remove('noLike');

    if (favouriteSerieList === null || favouriteSerieList === undefined){
      favouriteSerieList = [event.target.id];
    }else{
      favouriteSerieList.push(event.target.id);
    }
  }else{
    // borrar favorito.
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

  // recoger la info del localStorage. Hay que devolverla a su estado natural, a cadena
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
// llamamos en "serching" (catch)
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
// pintar los favoritos. Esta función es llamada en
//  "removing" y cuando guardamos por primera vez en local
// (cuando borremos). Hay que descodificarlos, antes los
// habíamos codificado. En la parte de favouriteSpace metemos
// generateSerieContent que es donde aparecen las series buscadas.
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
  serie += '<li class="newInfo">' + serieInfo.status + '</li>';
  serie += '</ul>';
  serie += '</div>';

  return serie;
}

function removing(){
  localStorage.clear();
  showFavourites();
}

reset.addEventListener('click', removing);

// recorre toda la info sobre la parte de favoritos. Es llamada dentro de 2
// funciones "serching"(petición) y "showFavourites"(sección favoritos)
function updateFavoriteClickEvent(){
  for(let serieNoLike of document.querySelectorAll('.noLike')){
    serieNoLike.addEventListener('click', favSav);
  }

  for(let myFav of document.querySelectorAll('.like')){
    myFav.addEventListener('click', favSav);
  }
}

// función colapsables
function openFavourites(){
  if(favouritesSaved.classList.contains('hidden')){
    favouritesSaved.classList.remove('hidden');
  }else{
    favouritesSaved.classList.add('hidden');
  }
}


collapsable.addEventListener('click', openFavourites);


