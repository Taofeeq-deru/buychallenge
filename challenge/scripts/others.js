const navToggler = document.querySelector("#nav-toggler");
const mobNav = document.querySelector("#mobile-nav");
const bioName = document.querySelector("#bio-name");
const bioDesc = document.querySelector("#bio-desc");
const tabName = document.querySelector("#tab-name");
const details = document.querySelectorAll("details");
const dropdownTogglers = document.querySelectorAll(".dd-toggler");
const dropdowns = document.querySelectorAll(".dropdown");
const root = document.documentElement;

const bioDescTop = bioDesc.offsetTop;

const toggleNav = () => {
  mobNav.classList.toggle("show");
};

const checkWidth = () => {
  let px;
  if (screen.width <= 1440) {
    px = `${100}px`;
  } else {
    px = `${(screen.width / 1400) * 250}px`;
  }
  root.style.setProperty("--screen-x", px);
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

dropdownTogglers.forEach((toggler) =>
  toggler.addEventListener("click", function handleDropdown() {
    const togglerID = toggler.getAttribute("data-dd");
    dropdowns.forEach((dropdown) => {
      const ddID = dropdown.getAttribute("id");
      if (togglerID == ddID) {
        dropdown.classList.toggle("show");
      } else {
        dropdown.classList.remove("show");
      }
    });
  })
);

details.forEach((detail) =>
  detail.addEventListener("click", function handleDetail(e) {
    details.forEach((det) => {
      det.removeAttribute("open");
    });
    if (detail.getAttribute("data-id") === "open") {
      e.preventDefault();
      detail.removeAttribute("open");
      detail.setAttribute("data-id", "close");
    } else {
      detail.setAttribute("data-id", "open");
    }
  })
);

navToggler.addEventListener("click", toggleNav);
window.addEventListener("resize", checkWidth);
window.addEventListener("scroll", showTabName);
window.addEventListener("load", checkWidth);
