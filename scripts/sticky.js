const sticky = document.querySelector('.sticky');

const setStickyH = () => {
  const h = sticky.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--sticky-h', `${h}px`);
};

setStickyH();

new ResizeObserver(setStickyH).observe(sticky);
window.addEventListener('load', setStickyH);
