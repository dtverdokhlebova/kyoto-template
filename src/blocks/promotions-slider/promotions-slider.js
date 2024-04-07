export default function promotionsSlider() {
  const blocks = document.querySelectorAll('.promotions-slider')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const buttonsWrapper = block.querySelector('.ui-swiper-buttons')
      const buttonNext = block.querySelector('.swiper-button-next')
      const buttonPrev = block.querySelector('.swiper-button-prev')
      const pagination = block.querySelector('.swiper-pagination')
      const lockedClass = 'ui-swiper-buttons--locked'
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
          768: {
            spaceBetween: 20
          },
          1260: {
            spaceBetween: 40
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: pagination,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
          }
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
