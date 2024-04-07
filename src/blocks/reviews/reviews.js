export default function reviews() {
  $(window).on('load', () => {
    for (const item of document.querySelectorAll('.reviews__item')) {
      const textInner = item.querySelector('.reviews__ui-p1')
      const textWrapper = item.querySelector('.reviews__text')
      const button = item.querySelector('.reviews__all')

      const textHeightBefore = textInner.offsetHeight
      textWrapper.classList.add('reviews__text--visible')
      const textHeightAfter = textInner.offsetHeight
      textWrapper.classList.remove('reviews__text--visible')

      textInner.style.height = `${textHeightBefore}px`

      if (textHeightBefore < textHeightAfter) {
        textWrapper.classList.add('reviews__text--visible')
        button.style.display = ''
      } else {
        textWrapper.classList.remove('reviews__text--visible')
        button.style.display = 'none'
      }

      button.addEventListener('click', function () {
        textWrapper.classList.toggle('reviews__text--visible')
        textInner.style.height = textWrapper.classList.contains('reviews__text--visible') ? `${textHeightBefore}px` : `${textHeightAfter}px`;
      })
    }
  })
}
