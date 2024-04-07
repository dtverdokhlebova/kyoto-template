export default function category() {
  const blocks = document.querySelectorAll('.category')
  if (blocks.length > 0) {
    for (const block of blocks) {
      const slider = block.querySelector('.swiper')
      const swiper = new Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1260: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }
      })
    }
  }
}
