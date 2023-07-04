import paletasDeColor from './paletas-color.js';

paletasDeColor();

document.addEventListener('click', ( e ) => {
  const btnGenerar = document.querySelector('.generarBtn')
  if(btnGenerar.contains(e.target)){
    paletasDeColor()
  }
})