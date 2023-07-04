import copyTextColor from './copiar-color.js';
import getBackgroundColor from './obtener-color.js';

export default function paletasDeColor() {
  // Capturamos el contenedor padre donde se iran almacenando cada paleta de color
  let $contenedor__paletas = document.querySelector(".contenedor__paletas");
  //  Generaremos 24 paletas de colores
  for (let i = 0; i < 24; i++) {
    // Creamos el contenedor de la paleta y le agregamos la clase contenedor paleta para darle estilo
    let $contenedor__paleta = document.createElement("ul");
    $contenedor__paleta.classList.add("contenedor__paleta");
    // Utilizamos la api chroma para sacar cada uno de los 4 colores, nos lo devolvera en un array que pasaremos a la funcion getBackgroundColor() lab -> mejor en mode
    let paletaColores = chroma.scale(arrayRango()).mode("lab").colors(4);
    //Por cada contenedor paleta tendremos 4 colores
    getBackgroundColor(paletaColores, $contenedor__paleta);
    // Creamos un boton que nos ayudara a copiar la paleta de color completa, obtendra los 4 colores en formato hexacedimal
    let btnCopy = document.createElement("button");
    btnCopy.classList.add("btn__copiar");
    btnCopy.textContent = "Copiar";
    // Le agregamos un evento a cada boton
    btnCopy.addEventListener("click", ( e ) => copyTextColor(paletaColores, btnCopy));
    // Insertamos los elementos que creamos
    $contenedor__paleta.insertAdjacentElement("beforeend", btnCopy);
    $contenedor__paletas.insertAdjacentElement("beforeend", $contenedor__paleta);
  }
}

// Crearemos 2 arreglos con 3 numeros random para simular un color rgb en un rango
const arrayRango = () => {
  return [
    [
      Math.floor(Math.random() * 255 + 1),
      Math.floor(Math.random() * 255 + 1),
      Math.floor(Math.random() * 255 + 1),
    ],
    [
      Math.floor(Math.random() * 255 + 1),
      Math.floor(Math.random() * 255 + 1),
      Math.floor(Math.random() * 255 + 1),
    ],
  ];
}
