const navToggler = document.querySelector("#nav-toggler");
const mobNav = document.querySelector("#mobile-nav");

const toggleNav = () => {
  mobNav.classList.toggle("show");
};

navToggler.addEventListener("click", toggleNav);
