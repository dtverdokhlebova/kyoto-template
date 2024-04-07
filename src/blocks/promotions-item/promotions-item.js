export default function promotionsItem() {
  $(window).on('load', () => {
    for (const item of document.querySelectorAll('.promotions-item')) {
      const textInner = item.querySelector('.promotions-item__ui-p1')
      const textWrapper = item.querySelector('.promotions-item__descr')
      const textWrapperClassVisible = 'promotions-item__descr--visible'

      const textHeightBefore = textInner.offsetHeight
      textWrapper.classList.add(textWrapperClassVisible)
      const textHeightAfter = textInner.offsetHeight
      textWrapper.classList.remove(textWrapperClassVisible)

      textInner.style.height = `${textHeightBefore}px`

      if (textHeightBefore < textHeightAfter) {
        textWrapper.classList.add('benefits__text--more')

        item.addEventListener('mouseenter', function () {
          textWrapper.classList.add(textWrapperClassVisible)
          textInner.style.height = `${textHeightAfter}px`
        })

        item.addEventListener('mouseleave', function () {
          textWrapper.classList.remove(textWrapperClassVisible)
          textInner.style.height = `${textHeightBefore}px`
        })
      }
    }
  })
}
