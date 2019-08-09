
## Sobre el proyecto
!Mi primer buscador de series¡
El ejercicio consistía en el desarrollo de una aplicación web de búsqueda de series de TV. El mismo debía realizarse con HTML, CSS y JAVASCRIPT.

## Estructuración básica
El contenido realizado en el HTML ha sido el más breve, una pequeña estructura para comenzar la página (buscador, título, links...)

## Estilos
En el CSS he planteado unos estilos básicos para los elementos creados en el HTML y en el JAVASCRIPT. Además, he incluido algunos iconos extraídos de "Font-awesome". Los colores y formas se han adaptado a una temática específica, la galaxia.

## JavaScript
La parte más importante que dota de interacción al ejercicio. Los puntos más destacables:
-Buscador: Por medio de la función "serching", he realizado una petición al servidor, que devuelve datos sobre series. En mi caso, le he concretado que me devolviese el título, el id y el cartel de cada serie.
Además, aquí se ha incluido un mensaje que salte en el caso que el servidor de un error (catch), que viene de la función "handleErrors", se genera fuera y se llama en "serching".

-Favoritos: Al hacer click sobre una serie, ésta cambia de color (cambio de clases) y dependiendo de la clase, la serie se añade o se elimina de favoritos. Esto se ha realizado a través de la función "FavSav".
La info guardada se reutiliza cuando vuelves a entrar en la página, las series favoritas se siguen manteniendo como favoritas (función "isFavouriteSerie")
Después de esto pintamos los favoritos (función "showFavourites")

-Borrar: El localStorage es borrado en una función ("removing") que hace referencia a la función (showFavourites).
Con la función "openFavourites" se borran de favoritas las series si pinchas sobre ellas directamente.






