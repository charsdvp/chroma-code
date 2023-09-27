import copyTextColor from './copiar-color.js';
import { arrayRango } from './logic/variacion-color.js';

// creamos un array para almacenar todas las paletas
const PALETAS = []
// creamos una funcion para crear la estructura de la paleta de color
export default function createPaleta() {
  // capturamos el elemento padre
  const contenedor_paletas = document.querySelector('.contenedor-paletas');
  // creamos las variaciones de la paleta de color
  let paletaColores = chroma.scale(arrayRango()).mode('lab').colors(4);
  // Agregamos la paleta generada
  PALETAS.push(paletaColores)
  // creamos el template
  let templatePaleta = `<div class="contenedor-paleta">
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
      const paletaActual = PALETAS[index]      
      copyTextColor(paletaActual, e.target)
    });
  });
}

// export default function paletasDeColor() {
//   let copia__paleta;
//   // contenedor padre
//   const $contenedor__paletas = document.querySelector('.contenedor__paletas');
//   for (let i = 0; i < 5; i++) {
//     // generamos los colores
//     $contenedor__paletas.innerHTML += templatePaleta;
//     // * evento copiar btn
//     document.querySelectorAll('.btn__copiar').forEach((btn) => {
//       btn.addEventListener('click', (e) => {
//         copyTextColor(paletaColores, e.target);
//       });
//     });
//     document.querySelectorAll('.btn__like').forEach((btn) => {
//       btn.addEventListener('click', (e) => {
//         const contenedor__aside = document.querySelector(
//           '.contenedor__aside__web'
//         );
//         const contenedor__paleta = btn.closest('.contenedor__paleta');
//         console.log(contenedor__paleta);
//         const imgHeart = btn.firstElementChild;
//         const orginalSrc = '../assets/heart.svg';
//         const filledSrc = '../assets/heart-filled.svg';
//         const regex = /\/assets\/heart\.svg/;

//         console.log(e);
//         if (regex.test(imgHeart.src)) {
//           copia__paleta = contenedor__paleta.cloneNode(true);
//           const copiaBotonLike = copia__paleta.querySelector('.btn__like');
//           // Cambiar la imagen de la copia del botón "like" al estado "liked"
//           copiaBotonLike.firstElementChild.src = filledSrc;
//           copiaBotonLike.addEventListener('click', (e) => {
//             // Aquí puedes manejar el evento click para la copia del botón "like"
//             contenedor__aside.removeChild(copia__paleta);
//             imgHeart.src = orginalSrc; // Actualizar el contenedor original
//           });

//           contenedor__aside.appendChild(copia__paleta);
//           imgHeart.src = filledSrc;
//           // Guardar el estado en localStorage como cadena JSON
//           localStorage.setItem(
//             'estadoLike',
//             JSON.stringify({ estado: 'liked' })
//           );
//         } else {
//           if (copia__paleta) {
//             contenedor__aside.removeChild(copia__paleta);
//             copia__paleta = null; // Limpiar la variable cuando se elimina la copia
//           }
//         }
//       });
//     });
//   }
//   // * evento copiar li
//   document.querySelectorAll('.color').forEach((color) => {
//     color.addEventListener('mouseover',(e) => (color.textContent = color.getAttribute('style').slice(12)));
//     color.addEventListener('mouseout', (e) => (color.textContent = ''));
//     color.addEventListener('click', (e) => {
//       const element = e.target; // Obtiene el elemento <li> que se hizo click
//       copyTextColor(color.getAttribute('style').slice(12), element);
//     });
//   });
// }
