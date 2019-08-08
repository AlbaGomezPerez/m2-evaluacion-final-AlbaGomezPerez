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
  .then (response => response.json())
  .then (data => {
// Bucle para recorrer la info devuelta (data) y
// pintar en el espacio de "series" las imágenes y títulos
    series.innerHTML='';

    for (let i = 0; i < data.length; i++){
    let serie = '<div class="serie-space">';
    serie += '<ul class="serie" >';
    serie += '<li class="space-title noLike">' +data[i].show.name+ '</li>';
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
}
