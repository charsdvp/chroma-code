import createPaleta from './paletas-color.js'

// creamos el evento que desplegara la seccion de favoritos
document.addEventListener('click', (e) => {
  // captruamos los elementos que activaran el aside
  const btn_menu = document.querySelector('.contenedor-nav-button')
  const favoritos = document.querySelector('.contenedor-favoritos')
  // validamos el evento aside
  if(btn_menu.contains(e.target)){
    favoritos.classList.toggle('is-active')
  }
})

document.addEventListener('DOMContentLoaded', (e) => {
  for (let i = 0; i < 2; i++) {
    createPaleta()
  }
})