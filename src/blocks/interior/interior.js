export default function interior() {
  const blocks = document.querySelectorAll('.interior')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const slides = block.querySelectorAll('.swiper-slide')
      const buttonNext = block.querySelector('.swiper-button-next')
      const buttonPrev = block.querySelector('.swiper-button-prev')
      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        enabled: true,
        breakpoints: {
          768: {
            slidesPerView: 'auto',
            spaceBetween: 0,
            enabled: false
          }
        },
        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `
              <span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
          }
        },
        on: {
          init: function (swiper) {
            interiorCalcHeight(slides)
          }
        }
      })
      window.addEventListener('resize', () => {
        interiorCalcHeight(slides)
      })
    }
  }
}

function interiorCalcHeight(slides) {
  if (window.innerWidth > 767) {
    let maxHeight = 0

    for (const slide of slides) {
      slide.style.minHeight = 'auto'
    }

    for (const slide of slides) {
      const slideHeight = slide.offsetHeight
      if (slideHeight > maxHeight) {
        maxHeight = slideHeight
      }
    }

    for (const slide of slides) {
      slide.style.minHeight = `${maxHeight}px`
    }
  } else {
    for (const slide of slides) {
      slide.style.minHeight = 'auto'
    }
  }
}
