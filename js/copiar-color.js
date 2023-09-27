export default async function copyTextColor ( textCopy, elementHtml ){
    const element = elementHtml

    element.innerText = "¡Copiado!";

      const textToCopy = textCopy;
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        return err;
      }
      setTimeout(() => {
        if(element instanceof HTMLButtonElement ){
          element.innerText = "Copiar";
        }
        if(element instanceof HTMLLIElement ){
          element.innerText = textToCopy;
        }
      }, 300);
}