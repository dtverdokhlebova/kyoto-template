export default function accordion() {
  $('.accordions__head').on('click', function () {
    $(this).find('.accordions__button').toggleClass('accordions__button--active')
    $(this).parents('.accordions__item').find('.accordions__body').slideToggle()
  })
}
