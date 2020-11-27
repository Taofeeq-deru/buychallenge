const navToggler = document.querySelector("#nav-toggler");
const mobNav = document.querySelector("#mobile-nav");
const bioName = document.querySelector("#bio-name");
const bioDesc = document.querySelector("#bio-desc");
const tabName = document.querySelector("#tab-name");

const bioDescTop = bioDesc.offsetTop;

const toggleNav = () => {
  mobNav.classList.toggle("show");
};

const showTabName = () => {
  if (window.pageYOffset >= bioDescTop) {
    tabName.style.visibility = "visible";
    bioName.style.visibility = "hidden";
  } else {
    tabName.style.visibility = "hidden";
    bioName.style.visibility = "visible";
  }
};

navToggler.addEventListener("click", toggleNav);
window.addEventListener("scroll", showTabName);
