export default function header() {
  window.openBurgerMenu = () => {
    $('.header').removeClass('header--menu')
    $('.header').addClass('header--burger')
    $('html').addClass('no-scroll')
  }

  window.closeBurgerMenu = () => {
    $('.header').removeClass('header--burger')
    $('html').removeClass('no-scroll')
  }

  window.openMenu = () => {
    const header = $('.header')
    const html = $('html')
    header.toggleClass('header--menu')
    if (header.hasClass('header--menu')) {
      html.addClass('no-scroll')
    } else {
      html.removeClass('no-scroll')
    }
    const menu = $('.header-menu__menu')
    const items = $('.header-menu__item')
    const itemsLength = items.length
    const activeItemHeight = menu.outerHeight() - (items.outerHeight() * itemsLength - 1)
    $('.header-menu__menu').css('--active-item-height', `${activeItemHeight}px`)
  }

  window.closeMenu = () => {
    $('.header').removeClass('header--menu')
    $('html').removeClass('no-scroll')
  }

  $('.header-menu__button').on('click', function () {
    $('.header-menu__item.active').removeClass('active')
    $(this).closest('.header-menu__item').addClass('active')
  })

  headerHeight()
  $(window).on('load', headerHeight)
  $(window).on('resize', headerHeight)
}

function headerHeight() {
  const headerHeight = $('.header').outerHeight()
  $('html').css('--header-height', `${headerHeight}px`)
}
