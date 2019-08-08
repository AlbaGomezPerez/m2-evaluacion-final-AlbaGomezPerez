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

// pintar en el espacio de "series"
    series.innerHTML='';
    for (let i = 0; i < data.length; i++){
    let serie = '<div class="serie">';
    serie += '<div class="space-title">' +data[i].show.name+ '</div>';
    serie += '<div class="space-image"><img src="' + data[i].show.image.medium + '"/></div>';
    serie += '</div>';
    series.innerHTML += serie;
    }
});
}


button.addEventListener('click', serching);

