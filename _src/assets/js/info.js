'use strict';

let infoUrl = new URL(window.location.href);
let id = infoUrl.searchParams.get('id');
console.log(id);

/*const page = document.querySelector('.page');*/
const series = document.querySelector('.page');
const urlId = 'http://api.tvmaze.com/shows/';

window.onload = function() {
  fetch(urlId + id)
    .then(response => response.json())
    .then(data => {
        // pintar en el espacio de "series" las imágenes y títulos
        series.innerHTML = '';
        // Bucle para recorrer la info devuelta (data). Empiezo en el elemento 0,
        // y añado cada vez uno.
        // variable que hace referencia al id, el name y la imagen.
        let serieDetail = {
          id: data.id,
          name: data.name,
          summary: data.summary,
        };
        if (data.image === null) {
          serieDetail.imageMedium = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        } else {
          serieDetail.imageMedium = data.image.medium;
        }
        series.innerHTML += generateSerieContentDetail(serieDetail);
      }
      );
}


function generateSerieContentDetail(serieDetail) {
  let serieMoreInfo = '<div class="serie-space">';
  serieMoreInfo += '<div class="space-title">' + serieDetail.name + '</div>';
  serieMoreInfo += '<ul class="serie">';
  // añadir etiqueta imagen (poner foto por defecto si no tiene la serie)
  serieMoreInfo += '<li class="space-image"><img src="' + serieDetail.imageMedium + '"/></li>';
  serieMoreInfo += '<li class="space-summary"><div>' + serieDetail.summary + '</div></li>';
  serieMoreInfo += '</ul>';
  serieMoreInfo += '<button class="return"><a class="link" href= "index.html' + '"></a></button>';
  serieMoreInfo += '</div>';
  return serieMoreInfo;
}

/*page.addEventListener('click',location.reload);*/
// refresh.addEventListener('onload', showDetailSerie);



