export default function certificates() {
  const blocks = document.querySelectorAll('.certificates')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 5,
        breakpoints: {
          768: {
            spaceBetween: 30
          },
          1260: {
            spaceBetween: 40
          }
        }
      })
    }
  }
}
