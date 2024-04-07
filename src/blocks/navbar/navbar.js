export default function navbar() {
  const navbar = $('.navbar')
  if (navbar.length > 0 && $(window).width() <= 1259) {
    $('html').css('--navbar-height', `${navbar.height()}px`)
    $(window).on('resize', () => $('html').css('--navbar-height', `${navbar.height()}px`))
  }
}
