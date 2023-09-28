import createPaleta from './paletas-color.js';
import copyTextColor from './copiar-color.js';
import { agregarEventosColores } from './paletas-color.js';

// creamos el evento que desplegara la seccion de favoritos
document.addEventListener('click', (e) => {
  // captruamos los elementos que activaran el aside
  const btn_menu = document.querySelector('.contenedor-nav-button');
  const favoritos = document.querySelector('.contenedor-favoritos');
  // validamos el evento aside
  if (btn_menu.contains(e.target)) {
    favoritos.classList.toggle('is-active');
  }
  const btnGenerar = document.querySelector('.btn-generar');
  // btn generar mas
  if (btnGenerar.contains(e.target)) {
    for (let i = 0; i < 50; i++) {
      createPaleta();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < 50; i++) {
    createPaleta();
  }
  // Obtener el contenedor de favoritos
  const contenedorFavoritos = document.querySelector('.contenedor-favoritos');

  // Recuperar y generar las paletas de favoritos
  Object.keys(localStorage).forEach((key, index) => {
    if (key) {
      const paletaId = key;
      const paletaData = localStorage.getItem(key);
      const paletaClon = document.createElement('div');
      paletaClon.innerHTML = paletaData; // Aquí cargamos la estructura HTML guardada en localStorage
      contenedorFavoritos.appendChild(paletaClon);
      // Almacenar los datos en el arreglo favoritosData
      const btnLike = paletaClon.querySelector('.btn-like');
      btnLike.addEventListener('click', (e) => {
        localStorage.removeItem(paletaId);
        contenedorFavoritos.removeChild(paletaClon);
      });
      const copiaColors = paletaClon.querySelectorAll('.color')
        agregarEventosColores(copiaColors)

      const btnCopiar = paletaClon.querySelector('.btn-copiar');
      btnCopiar.addEventListener('click', (e) => {
        const colores = []
      copiaColors.forEach((color) => {
        let colorArr = color.getAttribute('style').slice(12)
        colores.push(colorArr)              
      })    
        copyTextColor(colores, e.target);
      });
    }
  });
});
