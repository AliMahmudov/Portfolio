data = [
  {
    id: 1,
    img: "img/image1.jpg",
  },
  {
    id: 2,
    img: "img/image2.jpg",
  },
  {
    id: 3,
    img: "img/image3.jpg",
  },
  {
    id: 4,
    img: "img/image4.jpg",
  },
];

const sliderSetting = {
  slidePosition: 0,
  sliderWidth: 1000,
  sliderHeight: 600,
  slideAmount: 1000,
};

try {
  sliderSetting = {
    slidePosition: 0,
    sliderWidth: 6000,
    sliderHeight: 700,
    slideAmount: 3000,
  };
} catch (error) {
  console.log("slaydere deyme");
}

// Select elements
const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const slide = document.querySelector(".slide");
const sliderDots = document.querySelector(".slider-dots");
const leftButton = document.querySelector("#left-button");
const rightButton = document.querySelector("#right-button");

try {
  slider = document.querySelector("body");
} catch (error) {
  console.log("da olmadiki");
}

// Set styles
slides.style.width = `${data.length * sliderSetting.slideAmount}px`;
slider.style.width = `${sliderSetting.sliderWidth}px`;
slider.style.height = `${sliderSetting.sliderHeight}px`;

// Generate slides
function generateSlide(data) {
  slides.innerHTML = "";
  sliderDots.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let dot = `<span></span>`;
    let template = `		
		<div class="slide" style="width: ${sliderSetting.slideAmount}px;"><img src="${data[i].img}" alt=""></div>
	`;
    slides.innerHTML += template;
    sliderDots.innerHTML += dot;
  }
}

// slide Left
function slideLeft(e) {
  e.preventDefault();
  sliderSetting.slidePosition -= sliderSetting.slideAmount;
  if (sliderSetting.slidePosition < 0) {
    sliderSetting.slidePosition =
      data.length * sliderSetting.slideAmount - sliderSetting.slideAmount;
  }
  slides.style.transform = `translateX(-${sliderSetting.slidePosition}px)`;
}
leftButton.addEventListener("click", slideLeft);

// slide Right
function slideRight(e) {
  e.preventDefault();
  sliderSetting.slidePosition += sliderSetting.slideAmount;
  if (
    sliderSetting.slidePosition >
    data.length * sliderSetting.slideAmount - sliderSetting.slideAmount
  ) {
    sliderSetting.slidePosition = 0;
  }
  slides.style.transform = `translateX(-${sliderSetting.slidePosition}px)`;
}
rightButton.addEventListener("click", slideRight);

// start App
generateSlide(data);
