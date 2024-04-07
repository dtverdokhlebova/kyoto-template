export default function tabs() {
  if ($('.tabs').length > 0) {
    const tabs = document.querySelectorAll('.tabs')

    for (const item of tabs) {
      const tabsSlider = new Swiper(item.querySelector('.swiper'), {
        spaceBetween: 0,
        slidesPerView: 'auto',
        enabled: false,
        breakpoints: {
          768: {
            spaceBetween: 20,
            enabled: true
          }
        }
      })
    }
  }
  window.tabClick = (item) => {
    $(item).siblings('.tabs__item').removeClass('tabs__item--active')
    $(item).addClass('tabs__item--active')
  }
}
