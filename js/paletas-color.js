import copyTextColor from './copiar-color.js';
import { arrayRango } from './logic/variacion-color.js';
import { numberRandom } from './logic/id-random.js';

// creamos un array para almacenar todas las paletas
export const PALETAS = [];

// creamos una funcion para crear la estructura de la paleta de color
export default function createPaleta() {
  // capturamos el elemento padre
  const contenedor_paletas = document.querySelector('.contenedor-paletas');
  // creamos las variaciones de la paleta de color
  let paletaColores = chroma.scale(arrayRango()).mode('lab').colors(4);
  // Agregamos la paleta generada
  PALETAS.push(paletaColores);
  // creamos el template
  let templatePaleta = `<div class="contenedor-paleta" data-id="${numberRandom()}">
      <ul class="contenedor-colors">
        <li class="color" style="background: ${paletaColores[0]}"></li>
        <li class="color" style="background: ${paletaColores[1]}"></li>
        <li class="color" style="background: ${paletaColores[2]}"></li>
        <li class="color" style="background: ${paletaColores[3]}"></li>
      </ul>
      <div class="contenedor-buttons">
        <button class="btn-copiar">Copiar</button>
        <button class="btn-like">
          <img src="../assets/heart.svg" alt="" class="icon__heart">
        </button>
      </div> 
    </div>`;

  contenedor_paletas.innerHTML += templatePaleta;

  // * eventos li -> estaran despues de haber sido agregados las paletas de colores
  const colors = document.querySelectorAll('.color');
  colors.forEach((color) => {
    color.addEventListener(
      'mouseover',
      (e) => (color.textContent = color.getAttribute('style').slice(12))
    );
    color.addEventListener('mouseout', (e) => (color.textContent = ''));
    color.addEventListener('click', (e) => {
      copyTextColor(color.getAttribute('style').slice(12), e.target);
    });
  });

  // * eventos copiar btn
  const btnCopiar = document.querySelectorAll('.btn-copiar');
  btnCopiar.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      const paletaActual = PALETAS[index];
      copyTextColor(paletaActual, e.target);
    });
  });

  // * eventos copiar btn
  const btnLike = document.querySelectorAll('.btn-like');
  btnLike.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      // !capturaremos el boton like y la paleta asociada
      const imgHeart = btn.firstElementChild;
      const paleta = btn.closest('.contenedor-paleta');
      const paletaId = paleta.getAttribute('data-id');
      // !url de las imagenes
      const orginalSrc = '../assets/heart.svg';
      const filledSrc = '../assets/heart-filled.svg';

      // comprobamos si el boton like ya esta lleno o vacio
      const isLiked = imgHeart.src.includes('heart-filled');

      if (isLiked) {
        // si ya esta lleno lo vaciamos
        imgHeart.src = orginalSrc;
        // Eliminar la paleta de localStorage si existe
        localStorage.removeItem(paletaId);

        // encuentra la copia de la paleta en los favoritos y se elimina
        const contenedor_fav = document.querySelector('.contenedor-favoritos');
        const paletasFavoritas =
          contenedor_fav.querySelectorAll('.contenedor-paleta');

        paletasFavoritas.forEach((paletaFav) => {
          if (paletaFav.getAttribute('data-id') === paletaId) {
            contenedor_fav.removeChild(paletaFav);
          }
        });
      } else {
        // si no esta lleno lo llenamos
        imgHeart.src = filledSrc;
        // Clonamos la paleta y le agregamos un evento para deshacer la acción de "like"
        const paletaClon = paleta.cloneNode(true);
        paletaClon.setAttribute('data-id', paletaId);
        
        const copiaColors = paletaClon.querySelectorAll('.color')
        agregarEventosColores(copiaColors)

        const copiaBtnCopiar = paletaClon.querySelector('.btn-copiar')
        copiaBtnCopiar.addEventListener('click', (e) => {
          const paletaActual = PALETAS[index];
          copyTextColor(paletaActual, e.target);
        })
        const copiaBtnLike = paletaClon.querySelector('.btn-like');
        copiaBtnLike.firstElementChild.src = filledSrc;
        // eventos copia boton like        
        copiaBtnLike.addEventListener('click', (e) => {
          const paletaId = paletaClon.getAttribute('data-id');
          // Eliminar la paleta de localStorage si existe
          localStorage.removeItem(paletaId);
          // Eliminamos la paleta de favoritos
          const contenedor_fav = document.querySelector(
            '.contenedor-favoritos'
          );
          contenedor_fav.removeChild(paletaClon);
          // Volvemos a cambiar el botón "like" al estado original
          imgHeart.src = orginalSrc;
        });
        // Agregamos la paleta a favoritos
        const contenedor_fav = document.querySelector('.contenedor-favoritos');
        contenedor_fav.appendChild(paletaClon);

        // Guardar la estructura HTML de la paleta en localStorage
        localStorage.setItem(paletaId, paletaClon.innerHTML);
      }
    });
  });
}

export function agregarEventosColores(colors) {
  colors.forEach((color) => {
    color.addEventListener(
      'mouseover',
      (e) => (color.textContent = color.getAttribute('style').slice(12))
    );
    color.addEventListener('mouseout', (e) => (color.textContent = ''));
    color.addEventListener('click', (e) => {
      copyTextColor(color.getAttribute('style').slice(12), e.target);
    });
  });
}