// Crearemos 2 arreglos con 3 numeros random para simular un color rgb en un rango
export const arrayRango = () => {
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
};
