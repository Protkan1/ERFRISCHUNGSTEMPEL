const sliderImages = [
  "images/slide1.jpg",
  "images/slide2.jpg",
  "images/slide3.jpg",
  "images/slide4.jpg",
  "images/slide5.jpg"
];

const sliderImage = document.getElementById("sliderImage");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function changeSlide() {
  if (!sliderImage) return;

  currentIndex = (currentIndex + 1) % sliderImages.length;

  sliderImage.style.opacity = "0";

  setTimeout(() => {
    sliderImage.src = sliderImages[currentIndex];

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    sliderImage.style.opacity = "1";
  }, 350);
}

setInterval(changeSlide, 3500);