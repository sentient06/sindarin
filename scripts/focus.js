  const [hash, qs] = window.location.hash.substr(1).split('?');

  if (!!hash && !!qs) {
    const unhideElement = (element) => {
      element.style.display = "";
    }
    const hideElement = (element) => {
      element.style.display = "none";
    }
    const hideElements = (elements) => {
      for (const el of elements) {
        hideElement(el);
      }
    };
    const hideClass = (className) => {
      const elements = document.getElementsByClassName(className);
      hideElements(elements);
    };
    if (qs === 'focus') {
      const main = document.getElementsByTagName('main')[0];
      const h1s = document.getElementsByTagName('h1');
      const anchors = document.getElementsByTagName('a');
      
      main.style.paddingLeft = 0;
      main.style.paddingTop = '20px';

      hideClass('menu');
      hideClass('intro');
      hideClass('outro');
      hideClass('page');
      hideClass('top');
      hideElements(h1s);

      for (const anchor of anchors) {
        const name = anchor.name;
        if (!!name) {
          if (name === hash) {
            unhideElement(anchor.parentElement);
          }
        }
      }
    }
  }