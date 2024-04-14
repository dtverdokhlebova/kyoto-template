export default function banner() {
  const blocks = document.querySelectorAll('.banner')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const pagination = block.querySelector('.swiper-pagination')
      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        touchStartPreventDefault: false,
        pagination: {
          el: pagination,
          clickable: true,
          renderBullet: function (index, className) {
            return `
            <div class="${className}" data-index="${index}">
              <svg class="ui-swiper-pagination__svg" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="ui-swiper-pagination__dot" cx="27" cy="27" r="6" fill="url(#ui-swiper-pagination-dot-gradient)"/>
                <circle class="ui-swiper-pagination__circle-bg" cx="27" cy="27" r="26.5" stroke="#2F2F2F" stroke-width="2"/>
                <circle class="ui-swiper-pagination__circle" cx="27" cy="27" r="26.5" stroke="url(#ui-swiper-pagination-gradient)" stroke-width="2"/>
                <linearGradient id="ui-swiper-pagination-gradient" x1="4.77594" y1="10.316" x2="46.2311" y2="45.2759" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8A5C2A"/>
                  <stop offset="0.514222" stop-color="#C2A650" stop-opacity="0.81"/>
                  <stop offset="0.619294" stop-color="#D1BA5A" stop-opacity="0.92"/>
                  <stop offset="0.697308" stop-color="#C8AD53" stop-opacity="0.86"/>
                  <stop offset="1" stop-color="#A37C36"/>
                </linearGradient>
                <linearGradient id="ui-swiper-pagination-dot-gradient" x1="22.0613" y1="23.2925" x2="31.2736" y2="31.0613" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8A5C2A"/>
                  <stop offset="0.514222" stop-color="#C2A650" stop-opacity="0.81"/>
                  <stop offset="0.619294" stop-color="#D1BA5A" stop-opacity="0.92"/>
                  <stop offset="0.697308" stop-color="#C8AD53" stop-opacity="0.86"/>
                  <stop offset="1" stop-color="#A37C36"/>
                </linearGradient>
              </svg>
            </div>
            `
          }
        },
        on: {
          init: (swiper) => {
            const paginationCircle = slider.querySelector('.ui-swiper-pagination__circle')
            if (paginationCircle && swiper.slides.length > 1) {
              slider.style.setProperty('--stroke-dasharray', paginationCircle.getTotalLength() + 1)
              slider.style.setProperty('--delay', swiper.params.autoplay.delay)
            }
          }
        }
      })
    }
  }
}
