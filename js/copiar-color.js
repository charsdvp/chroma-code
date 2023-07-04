export default async function copyTextColor ( textCopy, elementHtml ){
  elementHtml.innerText = "¡Copiado!";
      const textToCopy = textCopy;
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        return err;
      }
      setTimeout(() => {
        if(elementHtml instanceof HTMLButtonElement ){
          elementHtml.innerText = "¡Copiar!";
        }
        if(elementHtml instanceof HTMLLIElement ){
          elementHtml.innerText = textToCopy;
        }
      }, 300);
}