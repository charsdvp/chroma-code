export default function paletasDeColor() {
  // Capturamos el contenedor padre
  let $contenedor__paletas = document.querySelector(".contenedor__paletas");
  // Generaremos 5 paletas de colores
  for (let i = 0; i < 50; i++) {
    // Creamos el contenedor de la paleta
    let $contenedor__paleta = document.createElement("ul");
    $contenedor__paleta.classList.add("contenedor__paleta");
    // Crearemos 2 arreglos con 3 numeros random para simular un color rgb en un rango
    let arrayRango = [
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
    let paletaColores = chroma.scale(arrayRango).mode("lab").colors(4);
    //Por cada contenedor paleta tendremos 4 colores
    for (let j = 0; j < 4; j++) {
      // Creamos los li que seran los colores de la paleta
      let color__fondo = document.createElement("li");
      color__fondo.classList.add("color");
      // Pintamos cada li
      color__fondo.style.background = paletaColores[j];
      $contenedor__paleta.insertAdjacentElement("beforeend", color__fondo);
    }
    // Creamos un boton
    let btn = document.createElement("button");
    btn.classList.add("btn__copiar");
    btn.innerText = "Copiar";
    // Le agregamos un evento a cada boton
    btn.addEventListener("click", async (e) => {
      btn.innerText = "¡Copiado!";
      const textToCopy = `Codigo hexadecimal:
    ${paletaColores}`;
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        return err;
      }
      setTimeout(() => {
        btn.innerText = "Copiar";
      }, 3000);
    });
    $contenedor__paleta.insertAdjacentElement("beforeend", btn);
    $contenedor__paletas.insertAdjacentElement(
      "beforeend",
      $contenedor__paleta
    );
  }
}
