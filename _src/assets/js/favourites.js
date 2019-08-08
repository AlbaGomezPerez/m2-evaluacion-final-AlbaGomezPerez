// FAVORITOS
// const favs=[];
// function myFavourite(){
//   const myfav = event.currentTarget;
//   myfav.classList.toggle ('favourite');
//   if(myfav.classList.contains('favourite'));
//   if(favs.includes(myfav)===false){
//   favs.push(id);
//   }else{
//     const favouriteSerie = favs.favouriteSerieOf(id);
//     if(favouriteSerie > -1){
//       favs.splice(favouriteSerie, 1);
//     }
//   }
// }
function myFavourite(){
  serie.classList.add('favourite');
}

series.addEventListener('click', myFavourite);

const seriesTitle = data[ii].show.name;
