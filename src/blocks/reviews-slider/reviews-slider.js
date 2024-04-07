export default function reviewsSlider() {
  const blocks = document.querySelectorAll('.reviews-slider')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const buttonsWrapper = block.querySelector('.ui-swiper-buttons')
      const buttonNext = block.querySelector('.swiper-button-next')
      const buttonPrev = block.querySelector('.swiper-button-prev')
      const lockedClass = 'ui-swiper-buttons--locked'
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 5,
        breakpoints: {
          1260: {
            spaceBetween: 20
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        on: {
          progress: function (swiper) {
            swiper.isLocked ? buttonsWrapper.classList.add(lockedClass) : buttonsWrapper.classList.remove(lockedClass)
          }
        }
      })
    }
  }
}
