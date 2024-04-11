export default function reviewsVideo() {
  reviewsVideoSlider()
  reviewsVideoPlyr()
}
function reviewsVideoSlider() {
  const blocks = document.querySelectorAll('.reviews-video')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const buttonsWrapper = block.querySelector('.ui-swiper-buttons')
      const buttonNext = block.querySelector('.swiper-button-next')
      const buttonPrevious = block.querySelector('.swiper-button-prev')
      const pagination = block.querySelector('.swiper-pagination')
      const lockedClass = 'ui-swiper-buttons--locked'
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
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
          prevEl: buttonPrevious
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
function reviewsVideoPlyr() {
  const blocks = document.querySelectorAll('.reviews-video__item')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const button = block.querySelector('.reviews-video__button')
      const player = new Plyr(block.querySelector('.reviews-video__video'), {
        controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'captions', 'fullscreen'],
        hideControls: true,
        ratio: '9:16',
        youtube: {
          rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1
        }
      })

      block.addEventListener('click', () => {
        if (!block.classList.contains('reviews-video__item--active')) {
          block.classList.add('reviews-video__item--active')
          player.play()
        }
      })
    }
  }
}
