import copyTextColor from './copiar-color.js';
// Creamos una funcion que le pasaremos un array de los colores
export default function getBackgroundColor( arrayColors, elementHTML ){
  for (let j = 0; j < 4; j++) {
    // Creamos los li que seran los colores de la paleta
    let color__fondo = document.createElement("li");
    color__fondo.classList.add("color");
    // Pintamos cada li
    color__fondo.style.background = arrayColors[j];
    // Agregamos 3 eventos mas para cada li
    color__fondo.addEventListener('mouseover', ( e ) => color__fondo.textContent = arrayColors[j])
    color__fondo.addEventListener('mouseout', ( e ) => color__fondo.textContent = '')    
    color__fondo.addEventListener("click",( e ) => copyTextColor(arrayColors[j], color__fondo) );      
    // insertamos cada color del fondo
    elementHTML.insertAdjacentElement("beforeend", color__fondo);
  }
}