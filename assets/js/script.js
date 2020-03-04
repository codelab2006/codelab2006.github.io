const toggleNav = () => {
  const style = document.querySelector('#nav-container').style;
  style.display = !style.display ? 'block' : '';
};

const hideNav = (event) => {
  const navContainer = document.querySelector("#nav-container");
  if (navContainer && navContainer.style.display) {
    let targetElement = event.target;
    do {
      if (targetElement === navContainer) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);
    toggleNav();
  }
}

document.addEventListener('click', event => {
  hideNav(event);
});

const navToggler = document.querySelector('#nav-toggler');
if (navToggler) {
  navToggler.addEventListener('click', event => {
    toggleNav();
    event.stopPropagation();
  });
}
