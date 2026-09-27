const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slide');
const bars = document.querySelectorAll('.slider__bar');
const [prevBtn, nextBtn] = document.querySelectorAll('.slider__arrow');

let current = 0;

function goToSlide(index) {
  current = index;
  track.style.transform = `translateX(-${index * 100}%)`;

  bars.forEach((bar, i) => {
    bar.classList.toggle('slider__bar--active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  const index = current === 0 ? slides.length - 1 : current - 1;
  goToSlide(index);
});

nextBtn.addEventListener('click', () => {
  const index = current === slides.length - 1 ? 0 : current + 1;
  goToSlide(index);
});

bars.forEach((bar, i) => {
  bar.addEventListener('click', () => goToSlide(i));
});
