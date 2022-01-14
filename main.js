//search animation
const searchDiv = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

searchBtn.addEventListener("click", (e) => {
  if (!searchInput.classList.contains("search-input_focus")) {
    searchInput.classList.add("search-input_focus");
    searchDiv.classList.add("search-active");
  }
  searchInput.focus();
});

searchInput.addEventListener("blur", (e) => {
  searchInput.classList.remove("search-input_focus");
  searchDiv.classList.remove("search-active");
});

//language image change
const langImage = document.querySelector(".lang-image");
const langCheckbox = document.querySelector(".lang-checkbox");

langCheckbox.addEventListener("change", () => {
  langImage.src = langCheckbox.checked
    ? "./images/eng.png"
    : "./images/arm.png";
});

//Swiper slider
const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  speed: 1200,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  direction: "horizontal",
});
// Animate on scroll
AOS.init();
//responsive navBar
// const mainNavBtn = document.querySelector(".main-nav-sections");
// const navBarBtn = document.querySelector(".navBar-btn");

// navBarBtn.addEventListener("click", (e) => {
//   mainNavBtn.classList.toggle("show");
// });

// modal images
const modal = document.querySelector(".modal-image");
const personImages = [...document.querySelectorAll(".person-images > img")];
const modalContent = document.querySelector(".modal-content");
const prevNextButtons = document.querySelector(".caption");
const closeBtn = document.querySelector(".close");
let imageIndex = null;

personImages.map((img, idx) => {
  img.addEventListener("click", () => {
    imageIndex = idx;
    modal.style.display = "block";
    modalContent.src = img.src;
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

// previous, next image
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

prev.addEventListener("click", () => {
  imageIndex = imageIndex === 0 ? personImages.length - 1 : imageIndex - 1;
  modalContent.src = personImages[imageIndex].src;
});

next.addEventListener("click", () => {
  imageIndex = imageIndex === personImages.length - 1 ? 0 : imageIndex + 1;
  modalContent.src = personImages[imageIndex].src;
});

modal.addEventListener("click", function (e) {
  if (e.target !== this) {
    return;
  }
  modal.style.display = "none";
});

//Responsive sizes
const sizes = [1200, 991, 768, 600];

function res(name, params) {
  sizes.map((size) => {
    let currentSize;
    switch (size) {
      case 1200:
        currentSize = 1439;
        break;
      case 991:
        currentSize = 1199;
        break;
      case 768:
        currentSize = 990;
        break;
      case 600:
        currentSize = 767;
        break;

      default:
        break;
    }

    let result = `@media only screen and (max-width: ${currentSize}px) {
      .${name} {`;
    for (let key in params) {
      if (!isNaN(params[key])) {
        let value = (size * params[key]) / 1440;
        result += `${key}: ${value.toFixed(1)}px;`;
      } else {
        result += `${key}: `;
        params[key].map((everyNum) => {
          let value = (size * everyNum) / 1440;
          result += `${value.toFixed(1)}px `;
        });
        result += `;`;
      }
    }
    result += `}}`;
    console.log(result);
  });
}

res("person-images img", {
  width: 20,
  awd: 35,
});
