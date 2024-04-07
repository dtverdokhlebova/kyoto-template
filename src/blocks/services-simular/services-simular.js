export default function servicesSimular() {
  const blocks = document.querySelectorAll('.services-simular')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const buttonsWrapper = block.querySelector('.ui-swiper-buttons')
      const buttonNext = block.querySelector('.swiper-button-next')
      const buttonPrev = block.querySelector('.swiper-button-prev')
      const lockedClass = 'ui-swiper-buttons--locked'
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
          1260: {
            spaceBetween: 40
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
