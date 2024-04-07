export default function largeActiveSlider() {
  const blocks = document.querySelectorAll('.large-active-slider')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const section = block.closest('.section')
      const pagination = section.querySelector('.swiper-pagination')
      const buttonNext = section.querySelector('.swiper-button-next')
      const buttonPrevious = section.querySelector('.swiper-button-prev')
      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 5,
        speed: 500,
        breakpoints: {
          768: {
            spaceBetween: 30
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrevious
        },
        pagination: {
          el: pagination,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
          }
        }
      })
    }
  }
}
