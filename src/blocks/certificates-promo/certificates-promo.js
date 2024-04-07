/* eslint-disable unicorn/prefer-dom-node-dataset */
export default function certificatesPromo() {
  const blocks = document.querySelectorAll('.certificates-promo')
  if (blocks.length > 0) {
    const isMobile = window.innerWidth <= 767
    const slideCardTransition = 300
    const slideChangeTransition = 500

    for (const block of blocks) {
      const bg = block.querySelector('.certificates-promo__bg-slider')
      const bgSlider = bg.querySelector('.swiper')
      const pagination = block.querySelector('.swiper-pagination')
      const bgSwiper = new Swiper(bgSlider, {
        loop: true,
        speed: slideChangeTransition,
        slidesPerView: 1,
        allowTouchMove: true,
        effect: isMobile ? undefined : 'fade',
        crossFade: !isMobile,
        loopAdditionalSlides: 1,
        pagination: {
          el: pagination,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
          }
        },
        breakpoints: {
          768: {
            allowTouchMove: false
          }
        }
      })

      const main = block.querySelector('.certificates-promo__slider')
      const slider = main.querySelector('.swiper')
      const buttonNext = main.querySelector('.swiper-button-next')
      const buttonPrevious = main.querySelector('.swiper-button-prev')
      const swiper = new Swiper(slider, {
        speed: slideChangeTransition,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        effect: isMobile ? 'fade' : undefined,
        crossFade: isMobile,
        enabled: false,
        breakpoints: {
          768: {
            enabled: true,
            slidesPerView: 'auto',
            spaceBetween: 30
          },
          1260: {
            enabled: true,
            slidesPerView: 'auto',
            spaceBetween: 40
          }
        },
        pagination: isMobile ?? {
          el: pagination,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
          }
        }
      })

      if (!isMobile) {
        swiper.on('loopFix', () => {
          swiper.slides[swiper.slides.length - 1].style.opacity = ''
        })
      }

      buttonNext.addEventListener('click', () => {
        if (isMobile) {
          bgSwiper.slideNext()
          return
        }

        if (block.hasAttribute('data-animation')) {
          return
        }
        block.setAttribute('data-animation', '')

        const currentSlide = swiper.slides[swiper.activeIndex]
        const currentSlideImg = currentSlide.querySelector('.certificates-promo__img img').src
        const coordinates = getCoordinates(currentSlide, block)

        const fakeImg = createImg()
        fakeImg.src = currentSlideImg
        fakeImg.style.width = `${coordinates.width}px`
        fakeImg.style.height = `${coordinates.height}px`
        fakeImg.style.top = `${coordinates.y}px`
        fakeImg.style.left = `${coordinates.x}px`
        block.append(fakeImg)
        const blockClientRect = block.getBoundingClientRect()
        const blockWidth = blockClientRect.width
        const blockHeight = blockClientRect.height
        currentSlide.style.opacity = 0
        setTimeout(() => {
          animateElement(fakeImg, {
            transform: {
              translateX: -coordinates.x,
              translateY: -coordinates.y
            },
            width: blockWidth,
            height: blockHeight,
            borderRadius: 0
          }, slideChangeTransition, () => {
            swiper.slideNext()
            bgSwiper.slideNext()

            animateElement(fakeImg, {
              opacity: 0
            }, slideChangeTransition, () => {
              fakeImg.remove()
              block.removeAttribute('data-animation')
            })
          })
        }, slideCardTransition)
      })

      buttonPrevious.addEventListener('click', () => {
        if (isMobile) {
          bgSwiper.slidePrev()
          return
        }

        if (block.hasAttribute('data-animation')) {
          return
        }
        block.setAttribute('data-animation', '')

        const currentSlide = swiper.slides[swiper.activeIndex]
        const coordinates = getCoordinates(currentSlide, block)

        const previousSlide = swiper.el.querySelector('.swiper-slide-prev') || swiper.slides[swiper.slides.length - 1]
        const previousSlideImg = previousSlide.querySelector('.certificates-promo__img img').src
        previousSlide.style.opacity = 0
        swiper.slidePrev()

        const blockClientRect = block.getBoundingClientRect()
        const blockWidth = blockClientRect.width
        const blockHeight = blockClientRect.height

        const fakeImg = createImg()
        fakeImg.src = previousSlideImg
        fakeImg.style.width = `${blockWidth}px`
        fakeImg.style.height = `${blockHeight}px`
        fakeImg.style.top = `${coordinates.y}px`
        fakeImg.style.left = `${coordinates.x}px`
        fakeImg.style.transform = `translate(-${coordinates.x}px, -${coordinates.y}px)`
        fakeImg.style.opacity = 0
        block.append(fakeImg)
        animateElement(fakeImg, {
          opacity: 1
        }, slideChangeTransition, () => {
          bgSwiper.slidePrev(0)
          animateElement(fakeImg, {
            transform: {
              translateX: 0,
              translateY: 0
            },
            width: coordinates.width,
            height: coordinates.height,
            borderRadius: 20
          }, slideChangeTransition, () => {
            previousSlide.style.opacity = ''
            setTimeout(() => {
              fakeImg.remove()
              block.removeAttribute('data-animation')
            }, slideChangeTransition)
          })
        })
      })
    }
  }
}

function getCoordinates(element, parent) {
  const elementClientRect = element.getBoundingClientRect()
  const parentClientRect = parent.getBoundingClientRect()
  return {
    x: elementClientRect.x - parentClientRect.x,
    y: elementClientRect.y - parentClientRect.y,
    width: elementClientRect.width,
    height: elementClientRect.height
  }
}

function createImg() {
  const img = document.createElement('img')
  img.className = 'certificates-promo__fake-img'
  return img
}

function animateElement(element, endValues, duration, callback) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame

  let startTime
  element.style.transition = 'none'

  const startValues = {}
  const elementStyles = window.getComputedStyle(element)
  for (const key in endValues) {
    if (key === 'transform') {
      const matrix = new DOMMatrixReadOnly(elementStyles[key])
      startValues.transform = {
        translateX: matrix.m41,
        translateY: matrix.m42
      }
    } else {
      startValues[key] = Number.parseFloat(elementStyles[key])
    }
  }

  function frame() {
    if (startTime === undefined) {
      startTime = performance.now()
    }

    const elapsedTime = performance.now() - startTime
    const normalizedTime = Math.min(elapsedTime / duration, 1)

    // Линейная функция
    const lerp = (start, end, t) => {
      return start * (1 - t) + end * t
    }

    const currentValues = {}
    // Вычисляем промежуточные значения и применяем их
    for (const key in endValues) {
      if (key === 'transform') {
        currentValues.transform = {
          translateX: lerp(startValues.transform.translateX, endValues.transform.translateX, normalizedTime),
          translateY: lerp(startValues.transform.translateY, endValues.transform.translateY, normalizedTime)
        }
        element.style.transform = `translate(
          ${currentValues.transform.translateX}px,
          ${currentValues.transform.translateY}px
        )`
      } else {
        currentValues[key] = lerp(startValues[key], endValues[key], normalizedTime)
        element.style[key] = `${currentValues[key]}${key === 'opacity' ? '' : 'px'}`
      }
    }

    // Если анимация еще не завершена, планируем следующий кадр
    if (elapsedTime < duration) {
      requestAnimationFrame(frame)
    } else {
      element.style.transition = ''
      if (callback) {
        callback()
      }
    }
  }

  // Запускаем первый кадр анимации
  requestAnimationFrame(frame)
}
