const sliderContainer = document.querySelector(".slick-slider");
const slider = document.querySelector(".slider-container");
const sliderContent = document.querySelector(".slider-content");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

const sliderSetting = {
  sliderWidth: 1200,
  slideWidth: 350,
  slideHeight: 300,
  autoplay: 2000,
  isActive: false,
  startX: 0,
  scrollLeft: 0,
  animationDelay: 30,
};

sliderContainer.style.width = `${sliderSetting.sliderWidth}px`;
// sliderContent.style.animation = `scroll infinite ${sliderSetting.animationDelay}s linear`;

function setSliderItemSize() {
  const slideImages = document.querySelectorAll(".slider-item");
  slideImages.forEach((item) => {
    item.style.width = `${sliderSetting.slideWidth}px`;
    item.style.height = `${sliderSetting.slideHeight}px`;
  });
}
setSliderItemSize();

// Mouse wheel rotating
slider.addEventListener("wheel", (event) => {
  event.preventDefault();
  slider.scrollLeft += event.deltaY;
  slider.style.scrollBehavior = "smooth";
});

// Previous & Next buttons
prevBtn.addEventListener("click", () => {
  slider.style.scrollBehavior = "smooth";
  slider.scrollLeft -= sliderSetting.slideWidth;
});
nextBtn.addEventListener("click", () => {
  slider.style.scrollBehavior = "smooth";
  slider.scrollLeft += sliderSetting.slideWidth;
});

// On mouse click dragging
slider.addEventListener("mousedown", (event) => {
  event.preventDefault();
  sliderSetting.isActive = true;
  slider.style.scrollBehavior = "auto";
  sliderSetting.startX = event.clientX;
  sliderSetting.scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  sliderSetting.isActive = false;
  slider.style.scrollBehavior = "smooth";
});
slider.addEventListener("mouseup", () => {
  sliderSetting.isActive = false;
  slider.style.scrollBehavior = "smooth";
});
slider.addEventListener("mousemove", (event) => {
  event.preventDefault();
  if (!sliderSetting.isActive) return;
  const x = event.clientX;
  const walk = (x - sliderSetting.startX) * 2;
  slider.scrollLeft = sliderSetting.scrollLeft - walk;
});

// infinite slider

function addAnimation() {
  const slider = document.querySelectorAll(".slider-container");
  slider.forEach((element) => {
    element.setAttribute("data-animated", true);

    sliderItem = element.querySelector(".slider-content");
    const sliderInner = Array.from(sliderContent.children);

    sliderInner.forEach((item) => {
      const duplicateItem = item.cloneNode(true);
      duplicateItem.setAttribute("aria-hidden", true);
      sliderItem.appendChild(duplicateItem);
    });
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  //   addAnimation();
}

// addAnimation()
function autoPlay() {
  let currentScroll = slider.scrollLeft;
  setInterval(() => {
    if (!sliderSetting.isActive) {
      slider.style.scrollBehavior = "smooth";
      currentScroll += sliderSetting.slideWidth;
      if (currentScroll >= slider.scrollWidth - slider.clientWidth) {
        let list = document.querySelectorAll(".slider-item");
        sliderContent.appendChild(list[0]);
      }
      slider.scrollLeft = currentScroll;
    }
  }, sliderSetting.autoplay);
}

autoPlay();
