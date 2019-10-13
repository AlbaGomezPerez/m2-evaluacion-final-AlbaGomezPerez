'use strict';

let infoUrl = new URL(window.location.href);
let id = infoUrl.searchParams.get('id');
console.log(id);


// api de id http://api.tvmaze.com/shows/

// fetch que me devuelva:
// -titulo. imagen. summary
