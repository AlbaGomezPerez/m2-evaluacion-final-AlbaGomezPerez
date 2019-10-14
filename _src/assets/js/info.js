'use strict';

let infoUrl = new URL(window.location.href);
let id = infoUrl.searchParams.get('id');
console.log(id);

const series = document.querySelector('.space-series');
const urlId = 'http://api.tvmaze.com/shows/';


  fetch(urlId + id)
    .then(response => response.json())
    .then(data => {
// pintar en el espacio de "series" las imágenes y títulos
      series.innerHTML = '';
// Bucle para recorrer la info devuelta (data). Empiezo en el elemento 0,
// y añado cada vez uno.
        // variable que hace referencia al id, el name y la imagen.
        let serieDetail = {
          id: data.show.id,
          name: data.show.name,
          summary: data.show.summary,
        };
        if (data.show.image === null) {
          serieDetail.imageMedium = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
          serieDetail.imageMedium = data.show.image.medium;
        }
        series.innerHTML += generateSerieContentDetail(serieDetail);
      }
    );

function generateSerieContentDetail(serieDetail) {
  let serieMoreInfo = '<div class="serie-space">';
  serieMoreInfo += '<ul class="serie" >';
  serieMoreInfo += '<li class="space-title ' + serieDetail.name + '</li>';
  // añadir etiqueta imagen (poner foto por defecto si no tiene la serie)
  serieMoreInfo += '<li class="space-image"><img src="' + serieDetail.imageMedium + '"/></li>';
  serieMoreInfo += '<li class="space-summary ' + serieDetail.summary + '"></li>';
  serieMoreInfo += '</ul>';
  serieMoreInfo += '</div>';
  console.log(serieDetail.id);
  console.log('El id de la serie es ' + (serieDetail.id) + ' y lo voy a usar');
  return serieMoreInfo;
}
