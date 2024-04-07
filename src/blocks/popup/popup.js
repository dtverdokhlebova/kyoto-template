export default function popup() {
  window.openPopup = function (element) {
    const popupElement = $(element)
    if (popupElement) {
      popupElement.addClass('active')
      $('html').css('overflow', 'hidden')
    }
  }

  window.closePopup = function (element) {
    $(element).removeClass('active')
    $('html').css('overflow', '')
  }

  $('.popup').on('click', function (event) {
    if ($(event.target).closest('.popup__container').length === 0) {
      $(this).removeClass('active')
      $('html').css('overflow', '')
    }
  })
}
